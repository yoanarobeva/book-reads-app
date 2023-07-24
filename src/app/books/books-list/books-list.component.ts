import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListsService } from 'src/app/shared/lists.service';

// interface PeriodicElement {
//   name: string;
//   position: number;
//   author: number;
//   symbol: string;
//   img: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', author: 1.0079, symbol: 'H', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 2, name: 'Helium', author: 4.0026, symbol: 'He', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 3, name: 'Lithium', author: 6.941, symbol: 'Li', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 4, name: 'Beryllium', author: 9.0122, symbol: 'Be', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 5, name: 'Boron', author: 10.811, symbol: 'B', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 6, name: 'Carbon', author: 12.0107, symbol: 'C', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 7, name: 'Nitrogen', author: 14.0067, symbol: 'N', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 8, name: 'Oxygen', author: 15.9994, symbol: 'O', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 9, name: 'Fluorine', author: 18.9984, symbol: 'F', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
//   {position: 10, name: 'Neon', author: 20.1797, symbol: 'Ne', img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1680459872l/20170404._SX98_.jpg'},
// ];


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})

export class BooksListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['rank', 'book_image', 'title', 'author', 'action'];
  list: any;
  listId: any;
  private sub: any;
  isLoading: boolean = true;

  constructor(private listsService: ListsService, private activatedRoutes: ActivatedRoute, private router: Router) {
  }

  
  ngOnInit(): void {
    this.sub = this.activatedRoutes.params.subscribe((params: Params) => {
      this.listId = +params['listId'];
      this.isLoading = true;
      this.listsService.getAList(this.listId!).subscribe({
        next: (list) => {
          this.list = list;
          this.list = this.list[0];
          this.isLoading = false;
        },
        error: err => {
          console.error(err);
        }     
      })
    });
  }  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
