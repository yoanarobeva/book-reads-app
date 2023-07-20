import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit{
  books: any;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        // console.log(this.books);
      },
      error: (err) => {
        console.log(err);
      }
    })
    
    
  }

}
