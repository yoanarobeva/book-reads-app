import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit{
  //TODO: make types!!!
  lists: any;
  isLoading: boolean = true;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getAllLists().subscribe({
      next: (lists) => {
        this.lists = lists;
        this.isLoading = false;
        // console.log('from all-books: listsLog', lists);
        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
