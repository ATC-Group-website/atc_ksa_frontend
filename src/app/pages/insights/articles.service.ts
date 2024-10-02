import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articles } from './articles';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getPosts(page: any): Observable<any> {
    return this.http.get<any>(
      `https://api.atcprotraining.com/blogs/paginate/3?page=${page}`,
    );
  }

  getPostDetails(id: any): Observable<any> {
    return this.http.get<any>(`https://api.atcprotraining.com/blogs/${id}`);
  }

  // getPostsHome(): Observable<any> {
  //   return this.http.get<any>(
  //     `https://api.atcprotraining.com/blogs/paginate/4`,
  //   );
  // }
}
