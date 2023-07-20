import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBooksComponent } from './all-books/all-books.component';
import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AllBooksComponent
  ],
  imports: [
    CommonModule, BooksRoutingModule, MaterialModule, HttpClientModule,
  ]
})
export class BooksModule { }
