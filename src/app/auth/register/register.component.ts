import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
    console.log(form.value);

    const {name, email, password, rePassword} = form.value;

    this.authService.register(name, email, password).subscribe({
      next: user => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: err => {
        alert(err.message);
      }
    });
  }
}
