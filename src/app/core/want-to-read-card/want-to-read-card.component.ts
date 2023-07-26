import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/books/services/books.service';

@Component({
  selector: 'app-want-to-read-card',
  templateUrl: './want-to-read-card.component.html',
  styleUrls: ['./want-to-read-card.component.css']
})
export class WantToReadCardComponent implements OnInit {
  book: any;

  @Input() bookId: any;

  constructor (private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getABook(this.bookId).subscribe({
      next: (book) => {
        this.book = book;        
      },
      error: err => alert(err.message)
    })
  }
}
