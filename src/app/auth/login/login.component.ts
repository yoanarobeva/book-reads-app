import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  loginHandler(form: NgForm) {
    if(form.invalid) {
      return;
    }

    console.log(form.value);

    const {email, password} = form.value;
    this.authService.login(email, password);
  
  }
}
