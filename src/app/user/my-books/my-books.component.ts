import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from 'src/app/books/services/books.service';
import { ShelvesService } from 'src/app/books/services/shelves.service';

interface PeriodicElement {
  name: string;
  position: number;
  author: number;
  symbol: string;
  img: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', author: 1.0079, symbol: 'H', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 2, name: 'Helium', author: 4.0026, symbol: 'He', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 3, name: 'Lithium', author: 6.941, symbol: 'Li', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 4, name: 'Beryllium', author: 9.0122, symbol: 'Be', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 5, name: 'Boron', author: 10.811, symbol: 'B', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 6, name: 'Carbon', author: 12.0107, symbol: 'C', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 7, name: 'Nitrogen', author: 14.0067, symbol: 'N', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 8, name: 'Oxygen', author: 15.9994, symbol: 'O', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 9, name: 'Fluorine', author: 18.9984, symbol: 'F', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
  {position: 10, name: 'Neon', author: 20.1797, symbol: 'Ne', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
];

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})

export class MyBooksComponent implements OnInit, OnDestroy {
    userShelves: any;
    wantShelf: any;
    currentShelf: any;
    readShelf: any ;
    user: any;
    private sub: any;
    isLoading: boolean = false;

    selectedShelf: string = 'all'
    booksOnShelf: any;
    
    constructor(
        private shelvesService: ShelvesService, 
        private authService: AuthService, 
        private activatedRoutes: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.sub =  this.activatedRoutes.params.subscribe((params: Params) => {
            this.selectedShelf = params['shelfName'];
            this.user = this.authService.user;
            this.isLoading = true;

            this.shelvesService.getOwnShelves(this.user._id).subscribe({
                next: data => {
                    this.userShelves = data;
                    console.log("all", this.userShelves);
                    this.wantShelf = this.userShelves.filter((x:any) => x.shelf === 'want');
                    console.log("want", this.wantShelf);
                    this.currentShelf = this.userShelves.find((x:any) => x.shelf === 'currently');
                    console.log("currently", this.currentShelf);
                    this.readShelf = this.userShelves.filter((x:any) => x.shelf === 'read');
                    console.log("read", this.readShelf);
                                
                    if (this.selectedShelf === 'want') {
                        this.booksOnShelf = this.wantShelf;
                    } else if (this.selectedShelf === 'currently') {
                        this.booksOnShelf = [this.currentShelf];
                    } else if (this.selectedShelf === 'read') {
                        this.booksOnShelf = this.readShelf;
                    } else {
                        this.booksOnShelf = this.userShelves;
                    }
                    console.log("BookOnShelf", this.booksOnShelf);

                    this.isLoading = false;
                },
                error: err => alert(err.message)
            });
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
