import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {};

  ngOnInit(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.isLogged;
      },
      error: err => console.error(err.message)
    })
    this.router.navigate(["/"])
  }
}
