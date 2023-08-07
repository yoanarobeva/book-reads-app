import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BooksService } from 'src/app/books/services/books.service';
import { List } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit, OnDestroy{
  lists!: List[];
  isLoading = true;
  sub!: Subscription;

  @Input('view') isItHomeView: boolean = false;
  
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    
    this.sub = this.booksService.getAllLists().subscribe({
      next: (lists: any) => {
        this.lists = lists;
        this.isLoading = false;        
      },
      error: err => console.error(err.message)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

