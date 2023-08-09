import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book, List } from 'src/app/shared/types';

@Component({
  selector: 'app-books-list-card',
  templateUrl: './books-list-card.component.html',
  styleUrls: ['./books-list-card.component.css']
})
export class BooksListCardComponent implements OnInit{
  books!: Book[];
  isLoading: boolean = true;
  @Input() list!: List;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    
    this.booksService.getBooksFromList(this.list._id).subscribe({
      next: (books: Book[]) => {
        this.books = books;
        this.isLoading = false;
      }, 
      error: err => console.error(err.message)
    })
  }
}
