import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenStorageService } from '../storage/token-storage.service';

interface JwtClaims {
  sub: string;
  role: '' | 'REQUESTER' | 'TECHNICIAN';
  exp: number;
}

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const tokenStorage = inject(TokenStorageService);

  const token = await tokenStorage.getToken();

  if (!token) {
    router.navigate(['auth']);
    return false;
  }

  try {
    const claims = jwtDecode<JwtClaims>(token);

    if (!claims.exp || !claims.role) {
      await tokenStorage.removeToken();
      router.navigate(['auth']);
      return false;
    }

    const isExpired = claims.exp * 1000 < Date.now();

    if (isExpired) {
      await tokenStorage.removeToken();
      router.navigate(['auth']);
      return false;
    }

    const requiredRoles = route.data?.['roles'];

    if (!requiredRoles) return true;

    if (!requiredRoles.includes(claims.role)) {
      router.navigate(['home']);
      return false;
    }

    return true;
  } catch {
    await tokenStorage.removeToken();
    router.navigate(['auth']);
    return false;
  }
};
