import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { TokenStorageService } from '../storage/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);

  return from(tokenStorage.getToken()).pipe(
    switchMap((token) => {
      if (!token) {
        return next(req);
      }

      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next(cloned);
    }),
  );
};
