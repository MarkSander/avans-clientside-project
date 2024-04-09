import { Injectable } from '@angular/core';
import { environment } from '../features/src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
} from 'rxjs';
import { IUser } from '../../shared/api/src';
import { Router } from '@angular/router';
import { AlertService } from '../alert/src';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.apiUrl + 'api/user';
  public currentUser$ = new BehaviorSubject<IUser | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {
    /*     this.getUserFromLocalStorage()
      ?.pipe(
        switchMap((user: IUser) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done')); */
  }

  login(email: string, password: string): Observable<IUser | undefined> {
    console.log(`login at ${this.endpoint}/login`);

    return this.http
      .post<IUser>(
        `${this.endpoint}/login`,
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          console.log(`New Current user: ${this.currentUser$.value}`);
          //this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          //this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  register(userData: IUser): Observable<IUser | undefined> {
    console.log(`register at ${environment.apiUrl}users`);
    console.log(userData);
    return this.http
      .post<IUser>(`${environment.apiUrl}users`, userData, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          //const user = new User(response);
          console.dir(user);
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          //this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          //this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  logout(): void {
    /*     console.log('logout - removing local user info');
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUser$.next(undefined);
    this.router.navigate(['/cards']); */
    this.router
      .navigate(['/cards'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          console.log(`Current user ${this.currentUser$.value}`);
          this.alertService.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  validateToken(userData: IUser): Observable<IUser | undefined> {
    const url = `${environment.apiUrl}auth/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      }),
    };

    console.log(`validateToken at ${url}`);
    return this.http.get<any>(url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      catchError((error: any) => {
        console.log('Validate token Failed');
        this.logout();
        this.currentUser$.next(undefined);
        return of(undefined);
      })
    );
  }

  getUserFromLocalStorage(): Observable<IUser> | undefined {
    const curUser = localStorage.getItem(this.CURRENT_USER);
    if (curUser) {
      const localUser = JSON.parse(curUser);
      return of(localUser);
    } else {
      return undefined;
    }
  }

  private saveUserToLocalStorage(user: IUser): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: IUser | undefined) => (user ? user._id === itemUserId : false))
    );
  }
}
