// src/common/decorators/cookies.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();

    // Helper untuk set cookie secara framework-agnostic
    const setCookie = (name: string, value: string, options?: Record<string, any>) => {
      // Detect adapter: Express
      if (response.cookie) {
        response.cookie(name, value, options);
      }
      // Detect adapter: Fastify
      else if (response.setCookie) {
        response.setCookie(name, value, options);
      } else {
        throw new Error('Cookie setting not supported for this response object');
      }
    };

    // Ambil cookie yang diminta
    const cookies = request.cookies || {};
    const value = data ? cookies[data] : cookies;

    // Return object: value + setCookie function
    return {
      value,
      setCookie,
    };
  },
);
