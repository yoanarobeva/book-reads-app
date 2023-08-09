import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from 'src/app/books/services/books.service';
import { Book, Shelf, User } from 'src/app/shared/types';

@Component({
  selector: 'app-user-current-card',
  templateUrl: './user-current-card.component.html',
  styleUrls: ['./user-current-card.component.css']
})
export class UserCurrentCardComponent implements OnInit, OnDestroy{
  book: Book | undefined;
  user!: User;
  isLoading: boolean = true;
  sub!: Subscription;

  @Input() currentShelf!: Shelf[];

  constructor(private booksService: BooksService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user!;
    const oneBookOfShelf: Shelf = this.currentShelf[0];
    const bookId = oneBookOfShelf.bookId;
    this.sub = this.booksService.getABook(bookId).subscribe({
      next: (book: Book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: err => console.error(err.message)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
