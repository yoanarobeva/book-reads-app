import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  isAuthenticating: boolean = true;

  constructor (private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.getProfile().subscribe({
    //   next: () => {
    //     this.isAuthenticating = false;
    //   },
    //   error: () => {
    //     this.isAuthenticating = false;
    //   },
    //   complete: () => {
    //     this.isAuthenticating = false;
    //   },
    // })
  }
}
