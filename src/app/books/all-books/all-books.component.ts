import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ListsService } from 'src/app/lists.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit{
  //TODO: make types!!!
  books: any;
  constructor(private booksService: BooksService, private listsService: ListsService) {}

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        console.log(this.books);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
