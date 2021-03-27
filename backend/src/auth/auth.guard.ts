import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './../users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());
        if(!roles) {
            return true; // public, no user assigned
        }
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const user:User = gqlContext['user'];
        if(!user) {
            return false;
        }
        if(roles.includes("Any")) {
            return true; // logged in, allowed for all user
        }
        return roles.includes(user.role);
    }
}
