import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { JwtService } from './../jwt/jwt.service';
import { MailService } from './../mail/mail.service';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';

const mockRepository = () => ({
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
});

const mockJwtService = () =>  ({
    sign: jest.fn(() => 'signed-token'),
    verify: jest.fn(),
});

const mockMailService = () => ({
    sendVerificationEmail: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe("UsersService", () => {
    let service: UsersService;
    let mailService: MailService;
    let jwtService: JwtService;
    let usersRepository: MockRepository<User>;
    let verificationsRepository: MockRepository<Verification>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository(),
                },
                {
                    provide: getRepositoryToken(Verification),
                    useValue: mockRepository(),
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService()
                },
                {
                    provide: MailService,
                    useValue: mockMailService()
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        mailService = module.get<MailService>(MailService);
        jwtService = module.get<JwtService>(JwtService);
        usersRepository = module.get(getRepositoryToken(User));
        verificationsRepository = module.get(getRepositoryToken(Verification));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createAccount', () => {
        let date = new Date();
        const createAccountArgs = {
            email: "test@email.com",
            nickname: "test",
            password: "test",
            role: 0,
            profileImg: "",
            gender: 0,
            birthday: date,
        };

        it('should fail if user exists', async () => {
            usersRepository.findOne.mockResolvedValue({
                id: 1,
                email: '',
            });

            const result = await service.createAccount(createAccountArgs);

            expect(result).toMatchObject({
                accepted: false,
                error: 'User exists with the email already'
            });
        });

        it('should create a new user', async () => {
            usersRepository.findOne.mockReturnValue(undefined);
            usersRepository.create.mockReturnValue(createAccountArgs);
            usersRepository.save.mockResolvedValue(createAccountArgs);
            verificationsRepository.create.mockReturnValue({ user: createAccountArgs });
            verificationsRepository.save.mockResolvedValue({
                code: "test_code",
            });
            const result = await service.createAccount(createAccountArgs);

            expect(usersRepository.create).toHaveBeenCalledTimes(1);
            expect(usersRepository.create).toHaveBeenCalledWith(createAccountArgs);
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledWith(createAccountArgs);
            expect(verificationsRepository.create).toHaveBeenCalledTimes(1);
            expect(verificationsRepository.create).toHaveBeenCalledWith({ user: createAccountArgs });
            expect(verificationsRepository.save).toHaveBeenCalledTimes(1);
            expect(verificationsRepository.save).toHaveBeenCalledWith({ user: createAccountArgs });
            expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
            expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(expect.any(String), expect.any(String), expect.any(String), expect.any(String), expect.any(String));
            expect(result).toEqual({ accepted: true });
        });

        it('should fail on exception', async () => {
            usersRepository.findOne.mockRejectedValue(new Error());
            const result = await service.createAccount(createAccountArgs);
            expect(result).toEqual({ 
                accepted: false, 
                error: 'Creating account failed' 
            });
        });
    });

    describe('login', () => {
        const loginArgs = {
            email: "test@mail.com",
            password: "12345"
        };

        it('should fail if user does not exist', async () => {
            usersRepository.findOne.mockResolvedValue(null);

            const result = await service.login(loginArgs);

            expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
            expect(usersRepository.findOne).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
            expect(result).toEqual({
                    accepted: false,
                    error: "User Not Found"
                });
        });

        it('should fail if the password is wrong', async () => {
            const mockedUser = {
                checkPassword: jest.fn(() => Promise.resolve(false)),
            };
            usersRepository.findOne.mockResolvedValue(mockedUser);
            const result = await service.login(loginArgs);
            expect(result).toEqual({
                    accepted: false,
                    error: "Wrong password",
                });
        });

        it('should return token if password is correct', async () => {
            const mockedUser = {
                id: 1,
                checkPassword: jest.fn(() => Promise.resolve(true)),
            };
            usersRepository.findOne.mockResolvedValue(mockedUser);
            const result = await service.login(loginArgs);
            expect(jwtService.sign).toHaveBeenCalledTimes(1);
            expect(jwtService.sign).toHaveBeenCalledWith(expect.any(Number));
            expect(result).toEqual({
                accepted: true,
                token: 'signed-token',
            });
        });

        it('should fail on exception', async () => {
            usersRepository.findOne.mockRejectedValue(new Error());
            const result = await service.login(loginArgs);
            expect(result).toEqual({
                accepted: false,
                error: 'Cannot log user in',
            });
        });
    });

    describe('findById', () => {
        const findByIdArgs = { id: 1 };

        it('should find an existing user', async () => {
            usersRepository.findOneOrFail.mockResolvedValue(findByIdArgs);
            const result = await service.findById(1);
            expect(result).toEqual({
                accepted: true,
                user: findByIdArgs,
            });
        });

        it('should fail if no user is found', async () => {
            usersRepository.findOneOrFail.mockRejectedValue(new Error());
            const result = await service.findById(1);
            expect(result).toEqual({
                accepted: false,
                error: 'User Not Found',
            });
        });
    });

    describe('editProfile', () => {
        it('should change email', async () => {
            const oldUser = {
                email: 'old@email.com',
                nickname: 'test',
                verified: true,
            };
            const editProfileArgs = {
                userId: 1,
                input: {
                    email: 'new@email.com',
                }
            };
            const newVerification = {
                code: 'code',
            };
            const newUser = {
                email: editProfileArgs.input.email,
                nickname: 'test',
                verified: false,
            };

            usersRepository.findOne.mockResolvedValue(oldUser);
            verificationsRepository.create.mockReturnValue(newVerification);
            verificationsRepository.save.mockResolvedValue(newVerification);

            await service.editProfile(editProfileArgs.userId, editProfileArgs.input);

            expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
            expect(usersRepository.findOne).toHaveBeenCalledWith(editProfileArgs.userId);
            expect(verificationsRepository.create).toHaveBeenCalledWith({ user: newUser });
            expect(verificationsRepository.save).toHaveBeenCalledWith(newVerification);
            expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
            expect(mailService.sendVerificationEmail).toHaveBeenCalledWith('Please Verify Your Email', 'email_confirmation_template', newUser.nickname, newVerification.code, newUser.email);
        });

        it('should change password', async () => {
            const editProfileArgs = {
                userId: 1,
                input: {
                    password: 'newpassword',
                }
            };

            usersRepository.findOne.mockResolvedValue({ password: 'oldpassword' });
            const result = await service.editProfile(editProfileArgs.userId, editProfileArgs.input);
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledWith(editProfileArgs.input);
            expect(result).toEqual({
                accepted: true,
            });
        });

        it('should change nickname', async () => {
            const editProfileArgs = {
                userId: 1,
                input: {
                    nickname: 'newnickname',
                }
            };

            usersRepository.findOne.mockResolvedValue({ nickname: 'oldnickname' });
            const result = await service.editProfile(editProfileArgs.userId, editProfileArgs.input);
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledWith(editProfileArgs.input);
            expect(result).toEqual({
                accepted: true,
            });
        });

        it('should change role', async () => {
            const editProfileArgs = {
                userId: 1,
                input: {
                    role: 1,
                }
            };

            usersRepository.findOne.mockResolvedValue({ role: 0 });
            const result = await service.editProfile(editProfileArgs.userId, editProfileArgs.input);
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledWith(editProfileArgs.input);
            expect(result).toEqual({
                accepted: true,
            });
        });
        
        it('should change profileImg', async () => {
            const editProfileArgs = {
                userId: 1,
                input: {
                    profileImg: 'newprofileImg__address',
                }
            };

            usersRepository.findOne.mockResolvedValue({ profileImg: 'oldprofileImg__address' });
            const result = await service.editProfile(editProfileArgs.userId, editProfileArgs.input);
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledWith(editProfileArgs.input);
            expect(result).toEqual({
                accepted: true,
            });
        });

        it('should change gender', async () => {
            const editProfileArgs = {
                userId: 1,
                input: {
                    gender: 1,
                }
            };

            usersRepository.findOne.mockResolvedValue({ gender: 3 });
            const result = await service.editProfile(editProfileArgs.userId, editProfileArgs.input);
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledWith(editProfileArgs.input);
            expect(result).toEqual({
                accepted: true,
            });
        });

        it('should fail on exception', async () => {
            usersRepository.findOne.mockRejectedValue(new Error());
            const result = await service.editProfile(1, {
                email: 'test@email.com',
            });
            expect(result).toEqual({
                accepted: false,
                error: 'Could not update profile',
            });
        });
    });

    describe('verifyEmail', () => {
        it('should verify email', async () => {
            const mockedVerification = {
                id: 1,
                user: {
                    verified: false,
                }
            };
            verificationsRepository.findOne.mockResolvedValue(mockedVerification);
            const result = await service.verifyEmail('');
            expect(verificationsRepository.findOne).toHaveBeenCalledTimes(1);
            expect(verificationsRepository.findOne).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
            expect(usersRepository.save).toHaveBeenCalledTimes(1);
            expect(usersRepository.save).toHaveBeenCalledWith({ verified: true });
            expect(verificationsRepository.delete).toHaveBeenCalledTimes(1);
            expect(verificationsRepository.delete).toHaveBeenCalledWith(mockedVerification.id);
            expect(result).toEqual({
                    accepted: true,
                });
        });

        it('should fail if verification is not found', async () => {
            verificationsRepository.findOne.mockResolvedValue(undefined);
            const result = await service.verifyEmail('');
            expect(result).toEqual({
                accepted: false,
                error: 'Verification Not Found',
            });
        });

        it('should fail on exception', async () => {
            verificationsRepository.findOne.mockRejectedValue(new Error());
            const result = await service.verifyEmail('');
            expect(result).toEqual({
                accepted: false,
                error: 'Could not verify email',
            });
        });
    });
});
