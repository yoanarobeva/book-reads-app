import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-general-home',
  templateUrl: './general-home.component.html',
  styleUrls: ['./general-home.component.css']
})
export class GeneralHomeComponent {
  constructor (private authService: AuthService) {}

  get isLoggedIn () {
    return this.authService.isLogged;
  }
}
