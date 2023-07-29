import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile();
    this.isAuthenticating = false;
  }
}
