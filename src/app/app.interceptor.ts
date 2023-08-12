import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

const { apiUrl } = environment;

@Injectable()

export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {};

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', apiUrl),
      });
    }

    if (req.method !== 'GET' && req.body) {
      req = req.clone({
        headers: new HttpHeaders({'content-type': 'application/json'})
      });
    }

    const token = this.authService.getToken;

    if (token) {
      req = req.clone({
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'X-Authorization': token,
        })
      });
    }
    
    return next.handle(req).pipe(
      catchError(err => {
        
        if(err.status ===  401) {
          this.router.navigate(['/auth/login']);
        } else {
          console.error(err.message);
        }
        return [err];
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
};
