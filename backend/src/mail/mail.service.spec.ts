import { Test } from '@nestjs/testing';
import { MailService } from './mail.service';
import { CONFIG_OPTIONS } from './../core/core.constants';
import got from 'got';
import * as FormData from 'form-data';

jest.mock('got');
jest.mock('form-data');

const TEST_DOMAIN = 'test-domain';

describe('MailService', () => {
    let service: MailService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [MailService, {
                provide: CONFIG_OPTIONS,
                useValue: {
                    apiKey: 'test-apiKey',
                    domain: TEST_DOMAIN,
                    fromEmail: 'test-fromEmail',
                }
            }]
        }).compile();
        service = module.get<MailService>(MailService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendVerificationEmail', () => {
        it('should call sendEmail', () => {
            const sendVerificationEmailArgs = {
                subject: 'subject',
                template: 'template',
                username: 'username',
                code: 'code',
                to: 'to',
            };
            jest.spyOn(service, 'sendEmail').mockImplementation(async () => true);
            service.sendVerificationEmail(
                sendVerificationEmailArgs.subject,
                sendVerificationEmailArgs.template,
                sendVerificationEmailArgs.username,
                sendVerificationEmailArgs.code,
                sendVerificationEmailArgs.to
            );
            expect(service.sendEmail).toHaveBeenCalledTimes(1);
            expect(service.sendEmail).toHaveBeenCalledWith(sendVerificationEmailArgs.subject, sendVerificationEmailArgs.template, [
                {key: 'code', value: sendVerificationEmailArgs.code},
                {key: 'username', value: sendVerificationEmailArgs.username}
            ], sendVerificationEmailArgs.to);

        });
    });

    describe('sendEmail', () => {
        const emailVars = [
            {key: 'code', value: 'test-code'},
            {key: 'username', value: 'test-username'}
        ];

        it('should send an email', async () => {
            const accepted = await service.sendEmail('', '', emailVars, '');
            const spyForm = jest.spyOn(FormData.prototype, "append");
            expect(spyForm).toHaveBeenCalled();
            expect(got.post).toHaveBeenCalledTimes(1);
            expect(got.post).toHaveBeenCalledWith(`https://api.mailgun.net/v3/${TEST_DOMAIN}/messages`, expect.any(Object));
            expect(accepted).toEqual(true);
        });

        it('should fail on exception', async () => {
            jest.spyOn(got, 'post').mockImplementation(() => {
                throw new Error();
            });
            const accepted = await service.sendEmail('', '', emailVars, '');
            expect(accepted).toEqual(false);
        });
    });
});
