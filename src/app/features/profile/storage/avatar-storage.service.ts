import { Injectable, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { WebStorageStrategy } from '../../../core/storage/strategies/web-storage.strategy';
import { NativeStorageStrategy } from '../../../core/storage/strategies/native-storage.strategy';
import { StorageStrategy } from '../../../core/storage/strategies/storage-strategy.interface';

const AVATAR_KEY = 'user_avatar';

@Injectable({ providedIn: 'root' })
export class AvatarStorageService {
  private readonly webStorage = inject(WebStorageStrategy);
  private readonly nativeStorage = inject(NativeStorageStrategy);
  private readonly strategy: StorageStrategy = Capacitor.isNativePlatform()
    ? this.nativeStorage
    : this.webStorage;

  getAvatar(): Promise<string | null> {
    return this.strategy.get(AVATAR_KEY);
  }

  saveAvatar(url: string): Promise<void> {
    return this.strategy.set(AVATAR_KEY, url);
  }

  removeAvatar(): Promise<void> {
    return this.strategy.remove(AVATAR_KEY);
  }
}
