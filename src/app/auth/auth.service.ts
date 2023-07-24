import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    
  }

  register(email: string, password: string) {
    
  }

  logout() {
    
  }
}
