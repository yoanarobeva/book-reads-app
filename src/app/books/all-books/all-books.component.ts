import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ListsService } from 'src/app/lists.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit{
  books: any;
  lists: any;
  constructor(private booksService: BooksService, private listsService: ListsService) {}

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

    this.listsService.getAllLists().subscribe({
      next: (lists) => {
        this.lists = lists;
        console.log('without modification list - ', this.lists);
        
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }

}
