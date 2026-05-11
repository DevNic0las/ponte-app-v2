import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/profile.model';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = `${environment.apiUrl}/users`;
  private http: HttpClient = inject(HttpClient);

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`);
  }
}
