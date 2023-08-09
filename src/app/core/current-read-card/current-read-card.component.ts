import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from 'src/app/books/services/books.service';
import { Book } from 'src/app/shared/types';

@Component({
  selector: 'app-current-read-card',
  templateUrl: './current-read-card.component.html',
  styleUrls: ['./current-read-card.component.css']
})
export class CurrentReadCardComponent implements OnInit, OnDestroy {
  book!: Book;
  isLoading: boolean = true;
  sub!: Subscription;

  @Input() bookId!: string;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.sub = this.booksService.getABook(this.bookId).subscribe({
        next: (book: Book) => {
            this.book = book;
            this.isLoading = false;
        },
        error: err => console.error(err.message)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
