import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Book, List } from 'src/app/shared/types';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit{
  lists!: List[];
  isLoading: boolean = true;

  constructor(private booksService: BooksService, private router: Router) {}

  addBookHandler(form: NgForm) {
    if(form.invalid) {
      return;
    }

    const {title, author, _listId, book_image, description} = form.value
    console.log(form.value);

    this.booksService.addABook({title, author, _listId, book_image, description}).subscribe({
      next: (book: any) => {
        const currentBook: Book = book;
        this.router.navigate([`/books/${currentBook._listId}/${currentBook._id}`]);
      },
      error: err => alert(err.message)
    })
    
  }

  ngOnInit(): void {
    this.booksService.getAllLists().subscribe({
      next: (lists: any) => {
        this.lists = lists;
        this.isLoading = false;        
      },
      error: err => alert(err.message)
    })
  }
}
