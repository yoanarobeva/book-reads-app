import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllBooksComponent,
  },
  {
    path: 'my',
    component: MyBooksComponent,
  },
  {
    path: 'new',
    component: NewBookComponent,
  },
  {
    path: ':listId',
    // pathMatch: 'full',
    component: BooksListComponent,
  },
  {
    path: ':listId/:bookId',
    component: BookDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
