import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ShelvesService } from '../services/shelves.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book: any;
  listId!: string;
  bookId!: string;
  isLoading: boolean = false;
  private sub: any;
  selectedShelf: any;
  selectedShelfName: string | undefined
  booksOnShelves: any;

  constructor(private booksService: BooksService, private activatedRoutes: ActivatedRoute, private shelvesService: ShelvesService, private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLogged;
  }

  get isOwner(): boolean {
    if (this.authService.user._id === this.book._ownerId) {
      return true;
    } else {
      return false;
    };
  }
  
  get currentShelf () {
    this.selectedShelf = this.booksOnShelves.find((x: any) => x.bookId === this.book._id)
    this.selectedShelfName = this.selectedShelf.shelf;
    return this.selectedShelfName;
  }

  deleteBookHandler(bookId: string) {
    alert('Do you want to delete a book?');
    this.booksService.removeABook(bookId).subscribe({
      next:() => {},
      error: err => alert(err.message)
    })
  }

  onShelfChange(shelfName: string) {

    if (this.selectedShelf?.bookId === this.bookId) {
      this.shelvesService.removeBook(this.selectedShelf._id).subscribe({
        next: () => {
          this.selectedShelf = undefined;
        },
        error: err => alert(err.message)
      });
    }

    this.shelvesService.addBook(shelfName, this.listId, this.bookId).subscribe({
      next: (data) => {
        this.selectedShelf = data;
        this.selectedShelfName = this.selectedShelf.shelf;
      },
      error: err => alert(err.message)
    });
  }

  ngOnInit(): void {
    this.sub =  this.activatedRoutes.params.subscribe((params: Params) => {
      this.listId = params['listId'];
      this.bookId = params['bookId'];
      this.isLoading = true;

      this.booksService.getABook(this.bookId).subscribe({
        next: (book) => {
          this.book = book;
        },
        error: err => {
          alert(err.message);
        }
      })
   })

   const userId = this.authService.user._id;

   this.shelvesService.getOwnShelves(userId).subscribe({
    next: list => {
      this.booksOnShelves = list;
      if (this.booksOnShelves.find((x: any) => x.bookId === this.bookId)) {
        this.selectedShelf = this.booksOnShelves.find((x: any) => x.bookId === this.bookId);
        this.selectedShelfName = this.selectedShelf.shelf;
      }
    },
    error: err => alert(err.message)
   })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
