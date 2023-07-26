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
    wantShelf: any;
    currentlyShelf: any;
    currentlyBook: any;

    constructor(private shelvesService: ShelvesService, private authService: AuthService, private booksService: BooksService) {}

    get currentBook () {
        if(this.currentlyShelf) {
            this.booksService.getABook(this.currentlyShelf[0].bookId).subscribe({
                next: book => {
                    this.currentlyBook = book;
                },
                error: err => alert(err.message)
            });
        }
        return this.currentlyBook;
    }

    ngOnInit(): void {
        const userId = this.authService.user._id;
        
        this.shelvesService.getOwnShelf(userId, 'want').subscribe({
            next: data => {
                this.wantShelf = data;
            },
            error: err => alert(err.message)
        });
        
        this.shelvesService.getOwnShelf(userId, 'currently'). subscribe({
            next: data => {
                this.currentlyShelf = data;
                
            },
            error: err => alert(err.message)
        });

  }
}
