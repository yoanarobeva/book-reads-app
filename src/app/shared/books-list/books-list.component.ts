import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from 'src/app/books/services/books.service';
import { Book, List, Shelf } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})

export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumnsAll: string[] = ['book_image', 'title', 'author', 'action'];
  displayedColumnsShelf: string[] = ['book_image', 'title', 'author', 'shelf', 'action'];

  books!: Book[];
  listId!: string;
  list!: List;
  private sub!: Subscription;
  isLoading: boolean = true;

  @Input() view!: string;
  @Input() selectedShelf: string | undefined;
  @Input() booksOnShelf: Shelf[] | undefined;

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
    return this.authService.user!._id;   
  }

  deleteBookHandler(bookId: string) {
    alert('Do you want to delete a book?');
    this.booksService.removeABook(bookId).subscribe({
      next:() => {},
      error: err => console.error(err.message)
    })
  }
  
  ngOnInit(): void {
    if(this.view === 'all') {
      this.sub = this.activatedRoutes.params.subscribe((params: Params) => {
        this.listId = params['listId'];
        this.isLoading = true;
  
        this.booksService.getAList(this.listId).subscribe({
          next: (list: any) => {
            this.list = list;
          },
          error: err => console.error(err.message)
        })
  
        this.booksService.getBooksFromList(this.listId).subscribe({
          next: (books: any) => {
            this.books = books;
            this.isLoading = false;
          },
          error: err => console.error(err.message)    
        })
      });
    } else {
      if(this.booksOnShelf) {
        this.books = this.booksOnShelf.map((x: any) => ({...x.bookData, "shelf": x.shelf})) as Book[];
        
        this.isLoading = false;
      }
    }
  }  

  ngOnDestroy(): void {
    if(this.view === 'all') {
      this.sub.unsubscribe();
    }
  }
  
}
