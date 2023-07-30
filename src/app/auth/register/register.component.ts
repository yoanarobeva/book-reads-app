import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { USER_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {};

  registerHandler(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.isLoading = true;

    //TODO: make matching passwords validation!!!!

    const {name, email, age, city, img, password, rePassword} = form.value;

    if (password === rePassword) {
      this.authService.register(name, email, age, city, img, password).subscribe({
        next: user => {
          this.isLoading = false;
          // sessionStorage.setItem(USER_KEY, JSON.stringify({...user, name, age, city, img}));
          this.router.navigate(['/home']);
        },
        error: err => console.error(err.message),
        complete: () => {
          this.authService.addUser(name, email, age, city, img, password).subscribe({
            next: () => {},
            error: err => console.error(err.message)
          })
        }
      });
    } else {
      this.isLoading = false;
      this.router.navigate(['/auth/register'])
    }
  }
}
