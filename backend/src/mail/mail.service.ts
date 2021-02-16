import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from './../core/core.constants';
import { IMailModuleOptions, IEmailVar } from './mail.interfaces';

@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: IMailModuleOptions
    ) {}
    
    private async sendEmail(subject: string, template: string, emailVars: IEmailVar[], to: string) {
        const form = new FormData();
        form.append('from', `from Pocket Market <minchul@${this.options.domain}>`);
        form.append('to', to);
        form.append('subject', subject);
        form.append('template', template);
        emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));

        try {
            await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `api:${this.options.apiKey}`,
                        ).toString("base64")}`,
                    },
                    body: form,
                    method: 'POST',
                }
            );
        } catch(e) {}
    }
    // 제목, template 이름, 유저 이름, 코드, 유저 메일
    sendVerificationEmail(subject: string, template: string, username: string, code: string, to: string) {
        this.sendEmail(subject, template, [
            {key: 'code', value: code},
            {key: 'username', value: username}
        ], to)
    }
}
