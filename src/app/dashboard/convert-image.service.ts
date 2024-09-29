import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConvertImageService {
  constructor(private http: HttpClient) {}

  // old
  // convertToBase64FromUrl(url: string): Observable<string> {
  //   // First, fetch the image as a blob
  //   return this.http.get(url, { responseType: 'blob' }).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching image:', error);
  //       return throwError(() => new Error('Error fetching image')); // Use factory function
  //     }),
  //     switchMap((blob: Blob) => {
  //       // Create an observable to handle the file reading asynchronously
  //       return new Observable<string>((observer) => {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           observer.next(reader.result as string); // Resolve with Base64
  //           observer.complete();
  //         };
  //         reader.onerror = (error) => observer.error(error); // Handle file read errors
  //         reader.readAsDataURL(blob); // Convert blob to Base64
  //       });
  //     }),
  //   );
  // }
  convertImageToBase64(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap((blob: Blob) => {
        return new Observable<string>((observer) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            observer.next(reader.result as string); // Emit the Base64 string
            observer.complete();
          };
          reader.onerror = (error) => observer.error(error);
          reader.readAsDataURL(blob); // Convert blob to Base64
        });
      }),
      catchError((error) => {
        console.error('Error fetching or converting image:', error);
        return throwError(() => new Error('Failed to convert image to Base64'));
      }),
    );
  }
}
