import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private http: HttpClient) {}

  sendApplications(formData: any): Observable<any> {
    // get the link once emails is working
    return this.http.post<any>(`apiurl/applications`, formData);
  }
}
