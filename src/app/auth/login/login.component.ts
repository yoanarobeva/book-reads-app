import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { USER_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  loginHandler(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.isLoading = true;

    const {email, password} = form.value;
    this.authService.login(email, password).subscribe({
      next: user => {
        this.isLoading = false;
        // sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error(err.message);
      }
    });
  
  }
}
