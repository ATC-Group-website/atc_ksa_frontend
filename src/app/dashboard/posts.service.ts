// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class PostsService {
//   constructor(private http: HttpClient) {}

//   authToken: BehaviorSubject<string | null> = new BehaviorSubject<
//   string | null
// >(null);

// const storedToken = localStorage.getItem('authToken');
// if (storedToken !== null) {
//   this.authToken.next(storedToken); // Set the initial value of adminToken
// }

//   private getRequestOptions(adminToken: string): { headers: HttpHeaders } {
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${authToken}`,
//     });
//     return { headers: headers };
//   }

//   addPost(formData: any, authToken: any): Observable<any> {
//     const requestOptions = this.getRequestOptions(authToken);

//     return this.http.post<any>(
//       `https://api.atcprotraining.com/blogs`,
//       formData,
//       requestOptions
//     );
//   }

//   getPosts(): Observable<any> {
//     return this.http.get<any>('https://api.atcprotraining.com/blogs');
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  authToken: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken !== null) {
      this.authToken.next(storedToken); // Set the initial value of authToken
    }
  }

  private getRequestOptions(authToken: string): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return { headers: headers };
  }

  addPost(formData: any): Observable<any> {
    const authToken = this.authToken.getValue(); // Retrieve the token value
    if (!authToken) {
      throw new Error('No auth token found');
    }

    const requestOptions = this.getRequestOptions(authToken);
    return this.http.post<any>(
      `https://api.atcprotraining.com/blogs`,
      formData,
      requestOptions,
    );
  }

  getPosts(): Observable<any> {
    return this.http.get<any>('https://api.atcprotraining.com/blogs');
  }
}
