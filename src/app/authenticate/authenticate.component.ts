import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating: boolean = true;
  private sub: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.getProfile().subscribe({
    //   next: (data: any) => {
    //     console.log("authenticating", data);
    //     this.isAuthenticating = false;
    //   },
    //   error: (err: any) => {
    //     console.error(err.message);
    //     this.isAuthenticating = false;
    //   },
    //   complete: (data: any) => {
    //     console.log("authenticating complete", data);
    //     this.isAuthenticating = false
    //   }
    // })
    this.authService.getProfile();
    this.isAuthenticating = false;
  }
}
