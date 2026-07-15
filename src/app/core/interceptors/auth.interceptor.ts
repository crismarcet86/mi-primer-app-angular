// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.usuarioActual()?.token;
  
  if (token) {
    const reqConToken = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(reqConToken);
  }

  return next(req);
};