import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { User } from './../src/users/entities/user.entity';
import { Verification } from './../src/users/entities/verification.entity';
import * as request from 'supertest';

const GRAPHQL_ENDPOINT = '/graphql';
const testUser = {
  email: 'rmc2@naver.com',
  password: '12345',
};

jest.mock("got", () => {
  return {
    post: jest.fn(),
  };
});

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let usersRepository: Repository<User>;
  let verificationsRepository: Repository<Verification>;
  let jwtToken: string;

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = (query: string) => baseTest().send({ query });
  const privateTest = (query: string) => 
    baseTest()
    .set('X-JWT', jwtToken)
    .send({ query });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    verificationsRepository = module.get<Repository<Verification>>(getRepositoryToken(Verification));
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  describe('createAccount', () => {
    it('should create account', () => {
      return publicTest(`
        mutation {
          createAccount(input: {
            email: "${testUser.email}",
            nickname: "Peter",
            password: "${testUser.password}",
            role: Client,
            gender: Male,
            birthday: "1994-12-06T15:00:00.000Z"
          }) {
            accepted
            error
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: { createAccount }
          }
        } = res;

        expect(createAccount.accepted).toBe(true);
        expect(createAccount.error).toBe(null);
      });
    });

    it('should fail if account already exists', () => {
      return publicTest(`
        mutation {
          createAccount(input: {
            email: "${testUser.email}",
            nickname: "Peter",
            password: "${testUser.password}",
            role: Client,
            gender: Male,
            birthday: "1994-12-06T15:00:00.000Z"
          }) {
            accepted
            error
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: { createAccount }
          }
        } = res;

        expect(createAccount.accepted).toBe(false);
        expect(createAccount.error).toBe('User exists with the email already');
      });
    });
  });

  describe('login', () => {
    it('should login with correct credentials', () => {
      return publicTest(`
        mutation {
          login(input: {
            email: "${testUser.email}",
            password: "${testUser.password}"
          }) {
            accepted
            error
            token
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: { login },
          },
        } = res;

        expect(login.accepted).toBe(true);
        expect(login.error).toBe(null);
        expect(login.token).toEqual(expect.any(String));
        jwtToken = login.token;
      });
    });

    it('should not be able to login with wrong credentials', () => {
      return publicTest(`
        mutation {
          login(input: {
            email: "${testUser.email}",
            password: "wrong-password"
          }) {
            accepted
            error
            token
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: { login },
          },
        } = res;

        expect(login.accepted).toBe(false);
        expect(login.error).toBe("Wrong password");
        expect(login.token).toBe(null);
      });
    });
  });

  describe('userProfile', () => {
    let userId: number;
    beforeAll(async () => {
      const [ user ] = await usersRepository.find();
      userId = user.id;
    });

    it("should see a user's profile", () => {
      return privateTest(`
        {
          userProfile(userId: ${userId}) {
            accepted
            error
            user {
              id
            }
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              userProfile: {
                accepted,
                error,
                user: {
                  id
                }
              }
            }
          }
        } = res;

        expect(accepted).toBe(true);
        expect(error).toBe(null);
        expect(id).toBe(userId);
      });
    });

    it("should not find a profile", () => {
      return privateTest(`
        {
          userProfile(userId: 123) {
            accepted
            error
            user {
              id
            }
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              userProfile: {
                accepted,
                error,
                user
              }
            }
          }
        } = res;

        expect(accepted).toBe(false);
        expect(error).toBe('User Not Found');
        expect(user).toBe(null);
      });
    });
  });

  describe('loggedinUser', () => {
    it("should find logged in user's profile", () => {
      return privateTest(`
        {
          loggedinUser {
            email
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              loggedinUser: {
                email
              }
            }
          }
        } = res;

        expect(email).toBe(testUser.email);
      });
    });

    it('should not allow logged out user', () => {
      return publicTest(`
        {
          loggedinUser {
            email
          }
        }`
      )
      .expect(200)
      .expect(res => {
        const {
          body: {
            errors
          }
        } = res;

        const [error] = errors;

        expect(error.message).toBe('Forbidden resource');
      });
    });
  });

  describe('editProfile', () => {
    const NEW_EMAIL = "minchul.roh.peter@gmail.com";
    const NEW_PASSWORD = "newpassword";
    const NEW_NICKNAME = "new";

    it("should change email", () => {
      return privateTest(`
        mutation {
          editProfile(input: {
            email: "${NEW_EMAIL}"
          }) {
            accepted
            error
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              editProfile: {
                accepted,
                error,
              }
            }
          }
        } = res;

        expect(accepted).toBe(true);
        expect(error).toBe(null);
      });

      it('should have new email', () => {
        return privateTest(`
          {
            loggedinUser {
              email
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                loggedinUser: {
                  email
                }
              }
            }
          } = res;

          expect(email).toBe(NEW_EMAIL);
        });
      });
    });

    it("should change password", () => {
      return privateTest(`
        mutation {
          editProfile(input: {
            password: "${NEW_PASSWORD}"
          }) {
            accepted
            error
          }
        }
      `)
      .expect(200)
      .expect(res => {
        const {
          body: {
            data: {
              editProfile: {
                accepted,
                error,
              }
            }
          }
        } = res;

        expect(accepted).toBe(true);
        expect(error).toBe(null);
    });

    it("should have new password", () => {
        return privateTest(`
          {
            loggedinUser {
              password
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                loggedinUser: {
                  password
                }
              }
            }
          } = res;

          expect(password).toBe(NEW_PASSWORD);
        });
      });
    });

    it("should change nickname", () => {
      return privateTest(`
        mutation {
          editProfile(input: {
            nickname: "${NEW_NICKNAME}"
          }) {
            accepted
            error
          }
        }
      `)

      it("should have new nickname", () => {
        return privateTest(`
          {
            loggedinUser {
              nickname
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                loggedinUser: {
                  nickname
                }
              }
            }
          } = res;

          expect(nickname).toBe(NEW_NICKNAME);
        });
      });
    });

    it("should change role", () => {
      return privateTest(`
        mutation {
          editProfile(input: {
            role: "Owner"
          }) {
            accepted
            error
          }
        }
      `)

      it("should have new role", () => {
        return privateTest(`
          {
            loggedinUser {
              role
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                loggedinUser: {
                  role
                }
              }
            }
          } = res;

          expect(role).toBe('Owner');
        });
      });
    });

    it.todo("should change profileImg");
    it.todo("should have new profileImg");

    it("should change gender", () => {
      return privateTest(`
        mutation {
          editProfile(input: {
            gender: "Other"
          }) {
            accepted
            error
          }
        }
      `)
      
      it("should have new gender", () => {
        return privateTest(`
          {
            loggedinUser {
              gender
            }
          }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                loggedinUser: {
                  gender
                }
              }
            }
          } = res;

          expect(gender).toBe('Other');
        });
      });
    });
  });

  describe('verifyEmail', () => {
    let verificationCode: string;
    
    beforeAll(async () => {
      const [verification] = await verificationsRepository.find();
      verificationCode = verification.code;
    });

    it('should verify email', () => {
      return publicTest(`
      mutation {
        verifyEmail(input: {
          code: "${verificationCode}"
        }) {
            accepted
            error
          }
        }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
              verifyEmail: {
                accepted,
                error
              }
            }
          }
        } = res;
        
        expect(accepted).toBe(true);
        expect(error).toBe(null);
      });
    });
    
    it('should fail on wrong verification code', () => {
      return publicTest(`
      mutation {
        verifyEmail(input: {
          code: "wrong-code"
          }) {
            accepted
            error
          }
        }
        `)
        .expect(200)
        .expect(res => {
          const {
            body: {
              data: {
                verifyEmail: {
                  accepted,
                  error
                }
              }
          }
        } = res;
        
        expect(accepted).toBe(false);
        expect(error).toBe('Verification Not Found');
      });
    });
  });
});
