import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
      // Set token from sessionStorage if available (e.g., page refresh)
      const storedToken = sessionStorage.getItem('adminToken');
      if (storedToken) {
        this.adminToken.next(storedToken);
      }
    }
  }

  // login admin
  loginAdmin(loginData: any): Observable<any> {
    return this.http.post<any>(
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
      sessionStorage.setItem('adminToken', token);
      this.adminToken.next(token); // Update the BehaviorSubject
    }
  }

  getToken(): string | null {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      return sessionStorage.getItem('adminToken');
    }
    return null;
  }

  // Logout the admin, remove token
  logoutAdmin() {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.removeItem('adminToken');
      this.adminToken.next(null); // Clear the BehaviorSubject
    }
  }
}
