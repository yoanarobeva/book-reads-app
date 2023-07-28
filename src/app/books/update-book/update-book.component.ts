import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book, List } from 'src/app/shared/types';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit, OnDestroy{
  book!: Book;
  lists!: List[];
  bookId!: string;
  isLoading: boolean = false;
  private sub: any;

  constructor(private booksService: BooksService, private activatedRoutes: ActivatedRoute, private router: Router) {}

  updateBookHandler(form: NgForm) {
    if(form.invalid) {
      return;
    }

    const {title, author, _listId, book_image, description} = form.value

    this.booksService.updateABook(this.bookId, {title, author, _listId, book_image, description}).subscribe({
      next: (book: any) => {
        const currentBook: Book = book;
        this.router.navigate([`/books/${currentBook._listId}/${currentBook._id}`]);
      },
      error: err => console.error(err.message)
    })
  }

  ngOnInit(): void {
    this.sub =  this.activatedRoutes.params.subscribe((params: Params) => {
      this.bookId = params['bookId'];
      this.isLoading = true;

      this.booksService.getABook(this.bookId).subscribe({
        next: (book: any) => {
          this.book = book;
          this.isLoading = false;
        },
        error: err => console.error(err.message)
      })

      this.booksService.getAllLists().subscribe({
        next: (lists: any) => {
          this.lists = lists;
          this.isLoading = false;        
        },
        error: err => console.error(err.message)
      })
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}