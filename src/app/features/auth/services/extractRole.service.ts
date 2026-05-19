// core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { TokenStorageService } from '../../../core/storage/token-storage.service';

interface JwtClaims {
  sub: string;
  role: '' | 'REQUESTER' | 'TECHNICIAN' | 'ADMIN';
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenStorage = inject(TokenStorageService);
  private roleSubject = new BehaviorSubject<string>('');

  role$ = this.roleSubject.asObservable();
  isAdmin$ = this.role$.pipe(map((r) => r === 'TECHNICIAN'));

  async loadRoleFromStorage(): Promise<void> {
    const token = await this.tokenStorage.getToken();
    const role = this.extractRole(token);
    this.roleSubject.next(role);
  }

  refreshRole(token: string): void {
    this.roleSubject.next(this.extractRole(token));
  }

  async logout(): Promise<void> {
    await this.tokenStorage.removeToken();
    this.roleSubject.next('');
  }

  private extractRole(token: string | null): string {
    if (!token) return '';
    try {
      const payload = jwtDecode<JwtClaims>(token);
      return payload.role ?? '';
    } catch {
      return '';
    }
  }
}
