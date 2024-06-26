/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
export class UserService {
  endpoint = environment.apiUrl + 'api/user';
  //endpoint = 'http://localhost:3000/api/user';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(options?: any): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   */
  public read(id: string | null, options?: any): Observable<IUser> {
    console.log(`read ${this.endpoint}`);
    return this.http
      .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public edit(user: IUser, options?: any) {
    console.log(`edit ${this.endpoint}/${user._id}`);
    return this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
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
    console.log('handleError in DeckService', error);

    return throwError(() => new Error(error.message));
  }
}
