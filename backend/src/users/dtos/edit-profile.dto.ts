import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreDTO } from './../../core/dtos/core.dto';
import { User } from './../entities/user.entity';

@InputType()
export class EditProfileInput extends PartialType(
    PickType(User, [
        "email",
        "password",
        "nickname",
        "role",
        "profileImg",
        "gender",
    ]),
) {}

@ObjectType()
export class EditProfileOutput extends CoreDTO {}
