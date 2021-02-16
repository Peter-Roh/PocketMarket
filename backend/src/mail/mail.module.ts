import { DynamicModule, Global, Module } from '@nestjs/common';
import { IMailModuleOptions } from './mail.interfaces';
import { CONFIG_OPTIONS } from './../core/core.constants';
import { MailService } from './mail.service';

@Module({})
@Global()
export class MailModule {
    static forRoot(options: IMailModuleOptions): DynamicModule {
        return {
            module: MailModule,
            exports: [MailService],
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                MailService,
            ],
        }
    }
}
