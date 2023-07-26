import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from 'src/app/books/services/books.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit{
  lists: any;

  @Input('view') isItHomeView: boolean = false;
  
  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    
    this.booksService.getAllLists().subscribe({
      next: (lists) => {
        this.lists = lists;
      },
      error(err) {
        console.error(err);
      },
    })
  }
}
