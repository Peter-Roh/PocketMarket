import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './../core/core.constants';
import { IJwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: IJwtModuleOptions
    ) {}

    sign(userId: number): string {
        return jwt.sign({ id: userId }, this.options.privateKey);
    }

    verify(token: string) {
        return jwt.verify(token, this.options.privateKey);
    }
}
