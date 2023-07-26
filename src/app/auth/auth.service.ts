import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { USER_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<any | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: any | undefined;
  userKey = USER_KEY;

  get isLogged(): boolean {
    return !!this.user;
  }

  get getToken(): string {
    return this.user?.accessToken;
  }

  subscription!: Subscription;

  constructor(private router: Router, private http: HttpClient) { 
    this.subscription = this.user$.subscribe(user => {
      const persistedData = localStorage.getItem(USER_KEY);
      if (persistedData) {
        this.user = JSON.parse(persistedData);
      } else {
        this.user = user;
      }
    })
  }

  login(email: string, password: string) {
    return this.http
      .post('/api/users/login', JSON.stringify({email, password}))
      .pipe(tap(user => this.user$$.next(user)))
  }

  register(name:string, email: string, password: string) {
    return this.http
      .post('/api/users/register', JSON.stringify({email, password, name}))
      .pipe(tap(user => this.user$$.next(user)));
  }

  logout() {
    return this.http.get('/api/users/logout').pipe(tap(() => this.user$$.next(undefined)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
