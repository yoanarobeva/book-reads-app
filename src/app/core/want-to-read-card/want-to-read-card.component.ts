import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from 'src/app/books/services/books.service';
import { Book } from 'src/app/shared/types';

@Component({
  selector: 'app-want-to-read-card',
  templateUrl: './want-to-read-card.component.html',
  styleUrls: ['./want-to-read-card.component.css']
})
export class WantToReadCardComponent implements OnInit, OnDestroy {
  book!: Book;
  isLoading: boolean = true;
  sub!: Subscription;

  @Input() bookId!: string;

  constructor (private booksService: BooksService) {}

  ngOnInit(): void {
    this.sub = this.booksService.getABook(this.bookId).subscribe({
      next: (book: any) => {
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
