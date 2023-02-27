import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ValidLoginParamsGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = {
      login: request.body.login,
      password: request.body.password,
    };

    if (!params.login || !params.password) {
      const paramsStr = Object.keys(params).reduce((result, next) => {
        if (params[next] !== null && params[next] !== undefined) {
          return result;
        }

        if (result === null) {
          return next;
        }

        return `${result} and ${next}`;
      }, null);

      throw new BadRequestException(`${paramsStr} can't be undefined or null`);
    }

    if (
      typeof params.login !== 'string' ||
      typeof params.password !== 'string'
    ) {
      const paramsStr = Object.keys(params).reduce((result, next) => {
        if (typeof params[next] === 'string') {
          return result;
        }

        if (result === null) {
          return next;
        }

        return `${result} and ${next}`;
      }, null);

      throw new BadRequestException(`${paramsStr} must be of a type string`);
    }

    return true;
  }
}
