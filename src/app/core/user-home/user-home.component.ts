import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from 'src/app/books/services/books.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.component.html',
    styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{
    userShelves: any;
    wantShelf: any;
    currentShelf: any;
    readShelf: any ;

    constructor(private shelvesService: ShelvesService, private authService: AuthService, private booksService: BooksService) {}

    ngOnInit(): void {
        const userId = this.authService.user._id;
        
        this.shelvesService.getOwnShelves(userId).subscribe({
            next: data => {
                this.userShelves = data;
                // console.log('user-shelves', data);
                this.wantShelf = this.userShelves.filter((x:any) => x.shelf === 'want');
                // console.log('want-shelf', this.wantShelf);
                this.currentShelf = this.userShelves.find((x:any) => x.shelf === 'currently');
                // console.log('current-shelf',this.currentShelf);
                this.readShelf = this.userShelves.filter((x:any) => x.shelf === 'read');
                // console.log('read-shelf', this.readShelf);
            },
            error: err => alert(err.message)
        });
    }
}
