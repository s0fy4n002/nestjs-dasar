import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CookieOptions } from './types/cookie-options.interface';

export interface CookieDecoratorReturn {
  value: string | undefined;
  setCookie: (name: string, value: string, options?: CookieOptions) => void;
}

export const Cookies = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): CookieDecoratorReturn => {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();

    const setCookie = (name: string, value: string, options?: CookieOptions) => {
      // Express
      if (response.cookie) {
        response.cookie(name, value, options);
      }
      // Fastify
      else if (response.setCookie) {
        response.setCookie(name, value, options);
      } else {
        throw new Error('Cookie setting not supported for this response object');
      }
    };

    const cookies = request.cookies || {};
    const value = data ? cookies[data] : cookies;

    return { value, setCookie };
  },
);
