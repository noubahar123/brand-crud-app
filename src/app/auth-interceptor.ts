import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const TOKEN = 'efPz790Rm0fJLOSWd0CK6fV4DYwsKN'

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${TOKEN}`
    }
  })

  return next(authReq);
};
