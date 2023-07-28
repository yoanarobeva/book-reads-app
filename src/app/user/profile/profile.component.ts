import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';
import { Shelf, User } from 'src/app/shared/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userShelves: Shelf[] | undefined;
    wantShelf: Shelf[] = [];
    currentShelf: Shelf[] = [];
    readShelf: Shelf[] = [];
    isLoading: boolean = true;

    user!: User;

    constructor(private shelvesService: ShelvesService, private authService: AuthService) {};

    ngOnInit(): void {
        this.user = this.authService.user!;
        
        this.shelvesService.getOwnShelves(this.user._id).subscribe({
            next: (data: any) => {
                this.userShelves = data;
                if(this.userShelves) {
                    this.wantShelf = this.userShelves.filter((x:any) => x.shelf === 'want');
                    this.currentShelf = this.userShelves.filter((x:any) => x.shelf === 'currently');
                    this.readShelf = this.userShelves.filter((x:any) => x.shelf === 'read');
                    this.isLoading = false;
                }
            },
            error: err => console.error(err.message)
        });
    }
}
