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
      .pipe(tap((user: User) => {        
        this.http.get(`/api/data/usersInfo?where=_ownerId%3D%22${user._id}%22`).subscribe({
          next: (data: any) => {
            const userData = data;
            const {age, city, img, name} = userData[0]
            this.user$$.next({...user, age, city, img, name})
            sessionStorage.setItem(USER_KEY, JSON.stringify({...user, age, city, img, name}));
          },
          error: err => console.error(err.message)
        })
      }))
  }

  register(name:string, email: string, age: string, city: string, img: string, password: string) {
    return this.http
      .post<User>('/api/users/register', JSON.stringify({name, email, age, city, img, password}))
      .pipe(tap((user: User) => {
        this.user$$.next({...user, name, age, city, img});
        sessionStorage.setItem(USER_KEY, JSON.stringify({...user, name, age, city, img}));
      }))
  }

  addUser(name:string, email: string, age: string, city: string, img: string, password: string) {
    return this.http.post<User>('/api/data/usersInfo', JSON.stringify({name, email, age, city, img, password}));
  }

  logout() {
    return this.http
      .get('/api/users/logout')
      .pipe(tap(() => {
        this.user$$.next(undefined);
        sessionStorage.clear();
      }));
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
