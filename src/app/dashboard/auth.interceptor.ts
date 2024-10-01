import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    const token = sessionStorage.getItem('adminToken');

    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next(authReq);
  }
  return next(req);
};
