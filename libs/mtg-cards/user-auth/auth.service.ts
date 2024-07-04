import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../features/src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { IUser } from '../../shared/api/src';
import { Router } from '@angular/router';
import { AlertService } from '../alert/src';
import { isPlatformBrowser } from '@angular/common';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.apiUrl + 'api/user';
  public isAdmin$ = new BehaviorSubject<boolean | false>(false);
  public currentUser$ = new BehaviorSubject<IUser | undefined>(undefined);
  //public currentUserRole$ = new BehaviorSubject<string | undefined>(undefined);
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private alertService: AlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    //this.getUserObservable().pipe(switchMap((user: IUser | undefined) =>))
    if (isPlatformBrowser(this.platformId)) {
      this.getUserObservable()
        .pipe(
          switchMap((user: IUser | undefined) => {
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
        .subscribe(() => console.log('Startup auth done'));
    }
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
        map((user: any) => {
          user.results as IUser;
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.isLoggedIn$.next(true);
          if (user.results.role === 'Admin') {
            this.isAdmin$.next(true);
          }
          console.log(`Current user role: ${this.isAdmin$}`);
          console.log(`New Current user: ${this.currentUser$}`);
          this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  register(userData: IUser): Observable<IUser | undefined> {
    console.log(`register at ${environment.apiUrl}users`);
    console.log(userData);
    return this.http
      .post<IUser>(`${environment.apiUrl}api/user`, userData, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          //const user = new User(response);
          console.dir(user);
          this.saveUserToLocalStorage(user);
          this.isLoggedIn$.next(true);
          //this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          //this.alertService.error(error.error.message || error.message);
          return throwError(error);
          //return of(undefined);
        })
      );
  }

  /*   logout(): void {
    this.router
      .navigate(['/decks'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.isLoggedIn$.next(false);
          this.currentUser$.next(undefined);
          this.isAdmin$.next(false);
          console.log(`Current user ${this.currentUser$.value}`);
          this.alertService.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  } */
  logout(): void {
    console.log('logout - removing local user info');
    localStorage.removeItem(this.CURRENT_USER);
    this.isLoggedIn$.next(false);
    this.currentUser$.next(undefined);
    this.isAdmin$.next(false);
    console.log(`Current user ${this.currentUser$.value}`);
    this.alertService.success('You have been logged out.');

    this.router
      .navigate(['/decks'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('Successfully navigated to /decks.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('Navigation error:', error));
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

  getUserFromLocalStorage(): IUser | undefined {
    const curUser = localStorage.getItem(this.CURRENT_USER);
    if (curUser) {
      const localUser = JSON.parse(curUser);
      return localUser.results;
    } else {
      return undefined;
    }
  }

  getUserObservable(): Observable<IUser | undefined> {
    const user = localStorage.getItem(this.CURRENT_USER);
    if (user) {
      const localUser = JSON.parse(user);
      return of(localUser);
    }
    return of(undefined);
  }

  private saveUserToLocalStorage(user: IUser): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): boolean {
    /* return this.currentUser$.pipe(
      map((user: IUser | undefined) => (user ? user._id === itemUserId : false))
    ); */
    const userId = this.getUserFromLocalStorage()?._id;
    if (userId === itemUserId) {
      return true;
    } else {
      return false;
    }
  }

  userIsAdmin(): boolean {
    const User = this.getUserFromLocalStorage();
    if (User?.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  userIsEditor(): boolean {
    const User = this.getUserFromLocalStorage();
    if (User?.role === 'Editor') {
      return true;
    } else {
      return false;
    }
  }

  getUserRole(): IUser | undefined {
    const curUser = localStorage.getItem(this.CURRENT_USER);
    if (curUser) {
      const localUser = JSON.parse(curUser);
      return localUser;
    } else {
      return undefined;
    }
  }
}
