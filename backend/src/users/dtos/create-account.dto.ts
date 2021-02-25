import { InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreDTO } from './../../core/dtos/core.dto';
import { User } from './../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(IntersectionType(
    PickType(User, [ // 필수 항목
        "email",
        "nickname",
        "password",
        "role",
        "gender",
        "birthday",
    ]), PartialType(
        PickType(User, [ // optional
            "profileImg"
        ])
    )
), [
    "email",
    "nickname",
    "password",
    "role",
    "gender",
    "birthday",
    "profileImg"
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreDTO {}
