import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from 'src/app/books/services/books.service';
import { List } from '../types';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit{
  lists!: List[];
  isLoading = true;

  @Input('view') isItHomeView: boolean = false;
  
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    
    this.booksService.getAllLists().subscribe({
      next: (lists: any) => {
        this.lists = lists;
        this.isLoading = false;        
      },
      error: err => console.error(err.message)
    })
  }
}
