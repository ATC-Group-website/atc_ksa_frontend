import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private http: HttpClient) {}

  bookConsultation(formData: any): Observable<any> {
    return this.http.post<any>(`apiurl/bookconsultation`, formData);
  }

  requestProposal(formData: any): Observable<any> {
    return this.http.post<any>(`apiurl/requestproposal`, formData);
  }

  getInTouch(formData: any): Observable<any> {
    return this.http.post<any>(`apiurl/getintouch`, formData);
  }
}
