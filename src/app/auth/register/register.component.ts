import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) {};

  registerHandler(form: NgForm) {
    if(form.invalid) {
      return;
    }


    //TODO: make matching passwords validation!!!!
    console.log(form.value);

    const {name, email, password, rePassword} = form.value;

    this.authService.register(email, password);
  }
}
