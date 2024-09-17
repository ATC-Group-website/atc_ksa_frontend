import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  authToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient) {}

  // login admin
  loginAdmin(loginData: any): Observable<any> {
    return this.http.post<any>(
      'https://api.atcprotraining.com/admin/login',
      loginData,
    );
  }
}
