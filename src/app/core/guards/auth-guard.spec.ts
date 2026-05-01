import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth-guard';
import { TokenStorageService } from '../storage/token-storage.service';

describe('authGuard', () => {
  let tokenStorage: jasmine.SpyObj<TokenStorageService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    tokenStorage = jasmine.createSpyObj('TokenStorageService', ['getToken', 'removeToken']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenStorageService, useValue: tokenStorage },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('deve bloquear se não tiver token', async () => {
    tokenStorage.getToken.and.resolveTo(null);

    const result = await TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['auth']);
  });

  it('deve permitir se tiver token válido', async () => {
    const fakeToken = gerarTokenValido();
    tokenStorage.getToken.and.resolveTo(fakeToken);

    const result = await TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBeTrue();
  });
});
function gerarTokenValido(): string {
  const payload = {
    sub: 'user123',
    role: 'TECHNICIAN',
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1h no futuro
  };

  return `header.${btoa(JSON.stringify(payload))}.signature`;
}
