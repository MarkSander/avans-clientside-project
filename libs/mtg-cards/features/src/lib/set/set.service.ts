import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, ISet } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { Set } from '@avans-nx-project/backend/features';

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
  public read(id: string | null, options?: any): Observable<Set> {
    console.log(`read ${this.endpoint}`);
    return this.http
      .get<ApiResponse<Set>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as Set),
        catchError(this.handleError)
      );
  }

  public edit(card: Set, options?: any): Observable<Set> {
    console.log(`edit ${this.endpoint}`);
    return this.http
      .put<ApiResponse<ISet>>(`${this.endpoint}/${card._id}`, card, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as Set),
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
