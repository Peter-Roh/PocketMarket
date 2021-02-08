import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from './../jwt/jwt.service';
import { LoginInput } from './dtos/login.dto';
import { CreateAccountInput } from './dtos/create-account.dto';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async createAccount({ email, nickname, password, role, method }: CreateAccountInput): Promise<{accepted: boolean; error?: string}> {
        // check new user 
        // create user & hash the password 
        try {
            const exists = await this.users.findOne({ email });
            if(exists) {
                // make error 
                return { accepted: false, error: 'User exists with the email already' };
            }
            await this.users.save(this.users.create({ email, nickname, password, role, method }));
            return { accepted: true };
        } catch (e) {
            console.log(e);
            return { accepted: false, error: 'Creating account failed' };
        }
    }

    async findById(id: number): Promise<User> {
        return this.users.findOne({ id });
    }

    async login({ email, password }: LoginInput): Promise<{accepted: boolean; error?: string, token?: string}> {
        // find the user with the email
        // check if the password is correct
        // make a JWT and give it to the user
        try {
            const user = await this.users.findOne({ email });
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
            const token = this.jwtService.sign({ id: user.id });
            return {
                accepted: true,
                token,
            };
        } catch (error) {
            return {
                accepted: false,
                error
            };
        }
    }

    async editProfile(userId: number, { email, password }: EditProfileInput): Promise<User> {
        const user = await this.users.findOne(userId);
        if(email) {
            user.email = email;
            user.verified = false;
//            await this.verification.save(this.verification.create({ user }));
        }
        if(password) {
            user.password = password;
        }
        return this.users.save(user);
    }
}
