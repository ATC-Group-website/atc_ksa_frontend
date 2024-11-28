import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private http: HttpClient) {}

  contact_us(formData: any): Observable<any> {
    return this.http.post<any>(
      `https://api.atcksa.com/mail/send-email`,
      formData,
    );
  }
}
