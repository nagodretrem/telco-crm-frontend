import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    req.headers.set('Authorization', `Bearer ${authToken}`);
  }

  return next(req);
};
