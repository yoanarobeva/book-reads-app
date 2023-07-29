import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { USER_KEY } from '../shared/constants';
import { User } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  userKey = USER_KEY;

  get isLogged(): boolean {
    return !!this.user;
  }

  get getToken() {
    return this.user?.accessToken;
  }

  subscription!: Subscription;

  constructor(private http: HttpClient) {

    const persistedData = sessionStorage.getItem(USER_KEY);

    if (persistedData) {
      this.user$$.next(JSON.parse(persistedData));
    } else {
      this.user$$.next(undefined);
    }

    this.subscription = this.user$.subscribe(user => {
      this.user = user;
    })
  }

  login(email: string, password: string) {
    return this.http
      .post<User>('/api/users/login', JSON.stringify({email, password}))
      .pipe(tap((user: any) => this.user$$.next(user)))
  }

  register(name:string, email: string, password: string) {
    this.http.post('/api/data/users', JSON.stringify({email, password, name}));
    return this.http
      .post<User>('/api/users/register', JSON.stringify({email, password, name}))
      .pipe(tap((user: any) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .get('/api/users/logout')
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getProfile() {
    const persistedData = sessionStorage.getItem(USER_KEY);
    if(persistedData) {
      this.user = JSON.parse(persistedData);
    } else {
      this.user = undefined;
    }
    return this.user;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
