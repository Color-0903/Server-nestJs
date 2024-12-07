import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionDefinition } from 'src/modules/permission/permission-definition';
import { UserService } from 'src/modules/user/user.service';
import { PERMISSIONS_METADATA_KEY } from './allow.decorator';
import { Permission } from 'src/modules/permission';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<PermissionDefinition[]>(
      PERMISSIONS_METADATA_KEY,
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }
    const isPublic =
      !!permissions && permissions.map((x) => x.name).includes(Permission.Public.name);

    if (!permissions || isPublic) {
      return true;
    }

    const { id } = context.switchToHttp().getRequest().headers;
    if (!id) {
      throw new NotFoundException('NO_ID_FOUND_IN_HEADER');
    }

    // const user = await this.userService.findById(id, ['id', 'fullName', 'email']);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // (context.switchToHttp().getRequest() as any).user = user;

    return true;
    //     const permissions = this.reflector.get<PermissionDefinition[]>(PERMISSIONS_METADATA_KEY, context.getHandler());
    //     if (!permissions) {
    //       return true;
    //     }
    //     const isPublic = !!permissions && permissions.map((x) => x.name).includes(Permission.Public.name);

    //     if (!permissions || isPublic) {
    //       return true;
    //     } else {
    //       const token = context.switchToHttp().getRequest().headers.authorization as string;

    //       const userJwt = this.authService.decode(token);
    //       if (!userJwt) {
    //         throw new UnauthorizedException();
    //       }
    //       const user = await this.authService.profile(userJwt.id);
    //       if (!user) {
    //         throw new UnauthorizedException();
    //       }
    //       (context.switchToHttp().getRequest() as any).user = user;
    //       const currentUserPermission = Array.from(new Set(flatten(user.roles?.map((r) => r.permissions))));
    //       const canActivate = this.checkValid(permissions, currentUserPermission);

    //       if (!canActivate) {
    //         throw new UnauthorizedException();
    //       } else {
    //         return canActivate;
    //       }
    //     }
  }
}
