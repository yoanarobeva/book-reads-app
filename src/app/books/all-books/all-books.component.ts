import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit{
  //TODO: make types!!!
  books: any;
  isLoading: boolean = true;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
