import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from 'src/app/books/services/books.service';

@Component({
  selector: 'app-user-current-card',
  templateUrl: './user-current-card.component.html',
  styleUrls: ['./user-current-card.component.css']
})
export class UserCurrentCardComponent implements OnInit{
  book: any;
  user: any;

  @Input() currentShelf: any;

  constructor(private booksService: BooksService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    const bookId = this.currentShelf.bookId;
    this.booksService.getABook(bookId).subscribe({
      next: book => {
        this.book = book;
      },
      error: err => alert(err.message)
    })
  }
}
