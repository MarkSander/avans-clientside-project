/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ISet } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class SetService {
  endpoint = 'http://localhost:3000/api/set';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<ISet[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<ISet[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as ISet[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(id: string | null, options?: any): Observable<ISet> {
    console.log(`read ${this.endpoint}`);
    return this.http
      .get<ApiResponse<ISet>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ISet),
        catchError(this.handleError)
      );
  }

  public edit(set: ISet, options?: any): Observable<ISet> {
    console.log(`edit ${this.endpoint}`);
    return this.http
      .put<ApiResponse<ISet>>(`${this.endpoint}/${set._id}`, set, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ISet),
        catchError(this.handleError)
      );
  }

  public delete(id: string) {
    console.log(`delete ${this.endpoint}`);
    return this.http
      .delete<ApiResponse<void>>(`${this.endpoint}/${id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }
  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in CardService', error);

    return throwError(() => new Error(error.message));
  }
}
