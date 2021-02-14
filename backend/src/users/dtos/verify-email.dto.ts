import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Verification } from './../entities/verification.entity';
import { CoreDTO } from './../../core/dtos/core.dto';

@InputType()
export class VerifyEmailInput extends PickType(Verification, ["code"]) {}

@ObjectType()
export class VerifyEmailOutput extends CoreDTO {}
