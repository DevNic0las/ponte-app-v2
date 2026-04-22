import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtClaims {
  sub: string;
  role: string;
  exp: number;
}

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');
  const x = 1;
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const claims = jwtDecode<JwtClaims>(token);

    if (!claims.exp || !claims.role) {
      throw new Error('Invalid token');
    }

    const expired = claims.exp * 1000 < Date.now();

    if (expired) {
      localStorage.removeItem('access_token');
      router.navigate(['/login']);

      return false;
    }

    if (claims.role !== 'ADMIN') {
      router.navigate(['/home']);
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem('access_token');
    router.navigate(['/login']);
    return false;
  }
};
