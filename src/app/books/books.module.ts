import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBooksComponent } from './all-books/all-books.component';
import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BooksListCardComponent } from './books-list-card/books-list-card.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormsModule } from '@angular/forms';
import { UpdateBookComponent } from './update-book/update-book.component';
import { AllBooksListComponent } from './all-books-list/all-books-list.component';



@NgModule({
  declarations: [
    AllBooksComponent,
    BooksListCardComponent,
    NewBookComponent,
    BookDetailsComponent,
    UpdateBookComponent,
    AllBooksListComponent,
  ],
  imports: [
    CommonModule, BooksRoutingModule, MaterialModule, SharedModule, HttpClientModule, FormsModule,
  ]
})
export class BooksModule { }
