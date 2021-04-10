import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from './../jwt/jwt.service';
import { UsersService } from './../users/users.service';
import { AllowedRoles } from './role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());
        if(!roles) {
            return true; // public, no user assigned
        }
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const token = gqlContext.token;
        if(token) {
            const decoded = this.jwtService.verify(token.toString());
            if(typeof decoded === "object" && decoded.hasOwnProperty('id')) {
                const { user } = await this.usersService.findById(decoded['id']);
                if(user) {
                    gqlContext['user'] = user;
                    if(roles.includes("Any")) {
                        return true; // logged in, allowed for all user
                    }
                    return roles.includes(user.role);
                }
            }
        }
        return false;
    }
}
