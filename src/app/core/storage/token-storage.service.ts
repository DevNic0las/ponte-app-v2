import { Injectable, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { WebStorageStrategy } from './strategies/web-storage.strategy';
import { NativeStorageStrategy } from './strategies/native-storage.strategy';
import { StorageStrategy } from './strategies/storage-strategy.interface';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private readonly webStorage = inject(WebStorageStrategy);
  private readonly nativeStorage = inject(NativeStorageStrategy);

  private readonly strategy: StorageStrategy = Capacitor.isNativePlatform()
    ? this.nativeStorage
    : this.webStorage;

  getToken(): Promise<string | null> {
    return this.strategy.get(TOKEN_KEY);
  }

  saveToken(token: string): Promise<void> {
    return this.strategy.set(TOKEN_KEY, token);
  }

  removeToken(): Promise<void> {
    return this.strategy.remove(TOKEN_KEY);
  }

  clearAll(): Promise<void> {
    return this.strategy.clear();
  }
}
