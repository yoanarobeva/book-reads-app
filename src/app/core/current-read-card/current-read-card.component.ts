import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/books/services/books.service';
import { Book } from 'src/app/shared/types';

@Component({
  selector: 'app-current-read-card',
  templateUrl: './current-read-card.component.html',
  styleUrls: ['./current-read-card.component.css']
})
export class CurrentReadCardComponent implements OnInit {
  book!: Book;
  isLoading: boolean = true;

  @Input() bookId: any;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getABook(this.bookId).subscribe({
        next: (book: any) => {
            this.book = book;
            this.isLoading = false;
        },
        error: err => console.error(err.message)
    });
  }

}
