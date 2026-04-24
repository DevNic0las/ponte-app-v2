import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { StorageStrategy } from './storage-strategy.interface';
import { Capacitor } from '@capacitor/core';
@Injectable({ providedIn: 'root' })
export class NativeStorageStrategy implements StorageStrategy {
  async get(key: string): Promise<string | null> {
    if (!Capacitor.isNativePlatform()) {
      console.warn('NativeStorageStrategy chamado fora de plataforma nativa');
      return null;
    }
    try {
      const { value } = await SecureStoragePlugin.get({ key });
      return value;
    } catch {
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    await SecureStoragePlugin.set({ key, value });
  }

  async remove(key: string): Promise<void> {
    try {
      await SecureStoragePlugin.remove({ key });
    } catch {
      // Ignora erro se a chave não existir
    }
  }

  async clear(): Promise<void> {
    await SecureStoragePlugin.clear();
  }
}
