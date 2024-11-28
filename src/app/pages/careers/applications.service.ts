import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private http: HttpClient) {}

  sendApplications(formData: any): Observable<any> {
    return this.http.post<any>(' https://api.atcksa.com/mail/sendcv', formData);
  }
}
