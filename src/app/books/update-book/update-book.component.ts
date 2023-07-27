import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit, OnDestroy{
  book: any;
  lists: any;
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
      next: (book) => {
        const currentBook: any = book;
        this.router.navigate([`/books/${currentBook!._listId}/${currentBook!._id}`]);
      },
      error: err => alert(err.message)
    })
    
  }

  ngOnInit(): void {
    this.sub =  this.activatedRoutes.params.subscribe((params: Params) => {
      this.bookId = params['bookId'];
      this.isLoading = true;

      this.booksService.getABook(this.bookId).subscribe({
        next: book => {
          this.book = book;
          this.isLoading = false;
        },
        error: err => alert(err.message)
      })

      this.booksService.getAllLists().subscribe({
        next: lists => {
          this.lists = lists;
          this.isLoading = false;        
        },
        error: err => alert(err.message)
      })
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
