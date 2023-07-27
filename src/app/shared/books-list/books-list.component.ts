import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from 'src/app/books/services/books.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})

export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumnsAll: string[] = ['book_image', 'title', 'author', 'action'];
  displayedColumnsShelf: string[] = ['book_image', 'title', 'author', 'shelf', 'action'];

  books: any;
  listId: any;
  list: any;
  private sub: any;
  isLoading: boolean = true;

  @Input() view!: string;
  @Input() selectedShelf: string | undefined;
  @Input() booksOnShelf: any;

  constructor(
    private authService: AuthService, 
    private booksService: BooksService, 
    private activatedRoutes: ActivatedRoute,
  ) {}

  get isItAllView(): boolean {
    return this.view === 'all'
  }
  
  get isLoggedIn(): boolean {
    return this.authService.isLogged;
  }

  get userId(): string {
    return this.authService.user._id;   
  }

  deleteBookHandler(bookId: string) {
    alert('Do you want to delete a book?');
    this.booksService.removeABook(bookId).subscribe({
      next:() => {},
      error: err => alert(err.message)
    })
  }
  
  ngOnInit(): void {
    if(this.view === 'all') {
      this.sub = this.activatedRoutes.params.subscribe((params: Params) => {
        this.listId = +params['listId'];
        this.isLoading = true;
  
        this.booksService.getAList(this.listId).subscribe({
          next: (list) => {
            this.list = list;
          },
          error: err => {
            console.error(err.message);
          } 
        })
  
        this.booksService.getBooksFromList(this.listId!).subscribe({
          next: (books) => {
            this.books = books;
            this.isLoading = false;
            // console.log('from books-list, booksFromListLog', books);
          },
          error: err => {
            console.error(err.message);
          }     
        })
      });
    } else {
      this.books = this.booksOnShelf;
      this.isLoading = false;
    }
  }  

  ngOnDestroy(): void {
    if(this.view === 'all') {
      this.sub.unsubscribe();
    }
  }
  
}
