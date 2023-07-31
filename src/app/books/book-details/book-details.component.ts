import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShelvesService } from '../services/shelves.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Book, Shelf } from 'src/app/shared/types';
import { Subscription } from 'rxjs';
import { ActivitiesService } from '../services/activities.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book!: Book;
  listId!: string;
  bookId!: string;
  isLoading: boolean = true;
  selectedShelf: Shelf | undefined;
  selectedShelfName: string | undefined
  booksOnShelves: Shelf[] | undefined;
  private subOne!: Subscription;
  private subTwo!: Subscription;

  constructor(
    private booksService: BooksService, 
    private activatedRoutes: ActivatedRoute, 
    private shelvesService: ShelvesService, 
    private authService: AuthService,
    private router: Router,
    private activitiesService: ActivitiesService,
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLogged;
  }

  get isOwner(): boolean {
    if (this.authService.user) {
      if (this.authService.user._id === this.book?._ownerId) {
        return true;
      } else {
        return false;
      };
    } else {
      return false;
    }
  }
  
  get currentShelf () {
    this.selectedShelf = this.booksOnShelves?.find((x: any) => x.bookId === this.book._id)
    this.selectedShelfName = this.selectedShelf?.shelf;
    return this.selectedShelfName;
  }

  deleteBookHandler(bookId: string) {
    alert('Do you want to delete a book?');
    this.booksService.removeABook(bookId).subscribe({
      next:() => {
        this.router.navigate([`/books/${this.listId}`])
      },
      error: err => console.error(err.message)
    })
  }

  onShelfChange(shelfName: string) {

    if (this.selectedShelf?.bookId === this.bookId) {
      this.shelvesService.removeBook(this.selectedShelf._id).subscribe({
        next: () => {
          this.selectedShelf = undefined;
        },
        error: err => console.error(err.message)
      });
    }

    this.shelvesService.addBook(shelfName, this.listId, this.bookId).subscribe({
      next: (data: any) => {
        this.selectedShelf = data;
        // console.log("before adding activity", this.selectedShelf); 
        this.activitiesService.registerActivity(shelfName, this.listId, this.bookId).subscribe({
          next: (data) => {
            // console.log("added activity", data);
          },
          error: err => console.error(err.message)
        })
        this.selectedShelfName = this.selectedShelf?.shelf;
      },
      error: err => console.error(err.message)
    });
  }

  ngOnInit(): void {
    this.subOne =  this.activatedRoutes.params.subscribe((params: Params) => {
      this.listId = params['listId'];
      this.bookId = params['bookId'];

      this.booksService.getABook(this.bookId).subscribe({
        next: (book: any) => {
          this.book = book;
          this.isLoading = false;
        },
        error: err => console.error(err.message)
      })
   })

   const userId = this.authService.user?._id;

   if(userId) {
     this.subTwo = this.shelvesService.getOwnShelves(userId).subscribe({
      next: (list: any) => {
        this.booksOnShelves = list;
        if (this.booksOnShelves?.find((x: any) => x.bookId === this.bookId)) {
          this.selectedShelf = this.booksOnShelves.find((x: any) => x.bookId === this.bookId);
          this.selectedShelfName = this.selectedShelf?.shelf;
        }
      },
      error: err => console.error(err.message)
     })
   }

  }

  ngOnDestroy(): void {
    this.subOne.unsubscribe();
    this.subTwo?.unsubscribe();
  }
}
