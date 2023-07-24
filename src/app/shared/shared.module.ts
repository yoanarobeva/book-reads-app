import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSearchComponent } from './book-search/book-search.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    BookSearchComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [BookSearchComponent, LoadingComponent ]
})
export class SharedModule { }
