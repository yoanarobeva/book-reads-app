import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userShelves: any;
    wantShelf: any;
    currentShelf: any;
    readShelf: any ;

    user: any;

    constructor(private shelvesService: ShelvesService, private authService: AuthService) {};

    ngOnInit(): void {
        this.user = this.authService.user;
        
        this.shelvesService.getOwnShelves(this.user._id).subscribe({
            next: data => {
                this.userShelves = data;
                console.log('user-shelves', data);
                this.wantShelf = this.userShelves.filter((x:any) => x.shelf === 'want');
                console.log('want-shelf', this.wantShelf);
                this.currentShelf = this.userShelves.find((x:any) => x.shelf === 'currently');
                console.log('current-shelf',this.currentShelf);
                this.readShelf = this.userShelves.filter((x:any) => x.shelf === 'read');
                console.log('read-shelf', this.readShelf);
            },
            error: err => alert(err.message)
        });
    }
}
