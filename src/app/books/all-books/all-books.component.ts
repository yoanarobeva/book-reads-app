import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { List } from 'src/app/shared/types';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit{
  lists!: List[];
  isLoading: boolean = true;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getAllLists().subscribe({
      next: (lists: List[]) => {
        this.lists = lists;
        this.isLoading = false;        
      },
      error: (err) => console.error(err.message)
    })
  }
}