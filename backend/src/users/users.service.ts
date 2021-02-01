import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>
    ) {}

    async createAccount({ email, password, role }: CreateAccountInput): Promise<{accepted: boolean; error?: string}> {
        try {
            const exists = await this.users.findOne({ email });
            if(exists) {
                return { accepted: false, error: 'User exists with the email already' };
            }
            await this.users.save(this.users.create({ email, password, role }));
            return { accepted: true };
        } catch (e) {
            console.log(e);
            return { accepted: false, error: 'Creating account failed' };
        }
    }
}
