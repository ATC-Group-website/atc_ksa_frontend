import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getPostDetails(id: any): Observable<any> {
    return this.http.get<any>(`https://api.atcprotraining.com/blogs/${id}`);
  }

  fetchPosts(
    postsPerPage: number,
    category: number,
    pageNumber: number,
  ): Observable<any> {
    return this.http.get<any>(
      `https://api.atcprotraining.com/blogs/paginate/${postsPerPage}/${category}?page=${pageNumber}`,
    );
  }

  getPostsHome(): Observable<any> {
    return this.http.get<any>(
      `https://api.atcprotraining.com/blogs/paginate/4`,
    );
  }
}
