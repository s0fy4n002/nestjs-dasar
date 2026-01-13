// src/common/types/cookie-options.interface.ts
export interface CookieOptions {
  maxAge?: number;         // dalam milidetik
  httpOnly?: boolean;      // hanya bisa diakses server
  secure?: boolean;        // hanya HTTPS
  path?: string;           // path cookie
  domain?: string;         // domain cookie
  sameSite?: 'strict' | 'lax' | 'none';
}