import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-list-card',
  templateUrl: './books-list-card.component.html',
  styleUrls: ['./books-list-card.component.css']
})
export class BooksListCardComponent implements OnInit{
  books: any;
  @Input() list: any;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    
    this.booksService.getBooksFromList(this.list._id).subscribe((books) => {
      this.books = books;
      // console.log('from book-list-card, booksLog', books);
      
    })
  }
}
