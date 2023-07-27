import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSearchComponent } from './book-search/book-search.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { BooksListComponent } from './books-list/books-list.component';


@NgModule({
  declarations: [
    BookSearchComponent,
    LoadingComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [BookSearchComponent, LoadingComponent, BooksListComponent ]
})
export class SharedModule { }
