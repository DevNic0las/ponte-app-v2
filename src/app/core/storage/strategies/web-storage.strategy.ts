import { Injectable } from '@angular/core';
import { StorageStrategy } from './storage-strategy.interface';

@Injectable({ providedIn: 'root' })
export class WebStorageStrategy implements StorageStrategy {
  async get(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}
