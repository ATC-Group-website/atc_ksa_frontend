import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginAdminData, LoginAdminResponse } from './dashboard';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient) {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        this.adminToken.next(storedToken);
      }
    }
  }

  // login admin
  loginAdmin(loginData: LoginAdminData): Observable<LoginAdminResponse> {
    return this.http.post<LoginAdminResponse>(
      'https://api.atcprotraining.com/admin/login',
      loginData,
    );
  }

  // After login, call this method to set the token
  setToken(token: string): void {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.setItem('token', token);
      this.adminToken.next(token); // Update the BehaviorSubject
    }
  }

  // Logout the admin, remove token
  logoutAdmin() {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.removeItem('token');
      this.adminToken.next(null); // Clear the BehaviorSubject
    }
  }
}
