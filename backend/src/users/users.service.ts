import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from './../jwt/jwt.service';
import { MailService } from './../mail/mail.service';
import { Verification } from './entities/verification.entity';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Verification) private readonly verifications: Repository<Verification>,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async createAccount({ email, nickname, password, role, profileImg, gender, birthday }: CreateAccountInput): Promise<CreateAccountOutput> {
        // check new user 
        // create user & hash the password 
        try {
            const exists = await this.users.findOne({ email });
            if(exists) {
                // make error 
                return {
                    accepted: false,
                    error: 'User exists with the email already'
                };
            }
            const user = await this.users.save(this.users.create({ email, nickname, password, role, profileImg, gender, birthday }));
            const verification = await this.verifications.save(this.verifications.create({
                user
            }));
            this.mailService.sendVerificationEmail('Please Verify Your Email', 'email_confirmation_template', user.nickname, verification.code, user.email);
            return { accepted: true };
        } catch (e) {
            return { 
                accepted: false, 
                error: 'Creating account failed' 
            };
        }
    }

    async findById(id: number): Promise<UserProfileOutput> {
        try {
            const user = await this.users.findOne({ id });
            if(user) {
                return {
                    accepted: true,
                    user
                };
            }
        } catch (error) {
            return {
                accepted: false,
                error: 'User Not Found',
            };
        }
    }

    async login({ email, password }: LoginInput): Promise<LoginOutput> {
        // find the user with the email
        // check if the password is correct
        // make a JWT and give it to the user
        try {
            const user = await this.users.findOne({ email }, { select: ["id" ,"password"] });
            if(!user) {
                return {
                    accepted: false,
                    error: "User Not Found"
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect) {
                return {
                    accepted: false,
                    error: "Wrong password",
                };
            }
            const token = this.jwtService.sign(user.id);
            return {
                accepted: true,
                token,
            };
        } catch (error) {
            return {
                accepted: false,
                error: 'Cannot log user in',
            };
        }
    }

    async editProfile(userId: number, { email, password, nickname, role, profileImg, gender }: EditProfileInput): Promise<EditProfileOutput> {
        try {
            const user = await this.users.findOne(userId);
            if(email) {
                user.email = email;
                user.verified = false;
                const verification = await this.verifications.save(this.verifications.create({ user }));
                this.mailService.sendVerificationEmail('Please Verify Your Email', 'email_confirmation_template', user.nickname, verification.code, user.email);
            }
            if(password) {
                user.password = password;
            }
            if(nickname) {
                user.nickname = nickname;
            }
            if(role) {
                user.role = role;
            }
            if(profileImg) {
                user.profileImg = profileImg;
            }
            if(gender) {
                user.gender = gender;
            }
            await this.users.save(user);
            return {
                accepted: true,
            };
        } catch (error) {
            return {
                accepted: false,
                error: 'Could not update profile',
            };
        }
    }

    async verifyEmail(code: string): Promise<VerifyEmailOutput> {
        try {
            const verification = await this.verifications.findOne({ code }, { relations: ['user'] });
            if(verification) {
                verification.user.verified = true;
                await this.users.save(verification.user);
                await this.verifications.delete(verification.id);
                return {
                    accepted: true,
                };
            }
            return {
                accepted: false,
                error: 'Verification failed',
            };
        } catch (error) {
            return {
                accepted: false,
                error,
            };
        }
    }
}
