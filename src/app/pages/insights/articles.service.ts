import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articles } from './articles';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://localhost:8000';

  getPosts(): Observable<Articles> {
    return this.http.get<Articles>(`${this.apiUrl}/posts`);
  }
}
