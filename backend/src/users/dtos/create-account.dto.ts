import { InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreDTO } from './../../core/dtos/core.dto';
import { User } from './../entities/user.entity';

@InputType()
export class CreateAccountInput extends IntersectionType(
    PickType(User, [
        "email",
        "nickname",
        "password",
        "role",
        "gender",
        "birthday",
]), PartialType(PickType(User, ["profileImg"]))) {}

@ObjectType()
export class CreateAccountOutput extends CoreDTO {}
