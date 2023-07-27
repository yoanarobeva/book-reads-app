import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { NewBookComponent } from './new-book/new-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { loggedInGuard } from '../shared/guards/auth-guard.guard';
import { UpdateBookComponent } from './update-book/update-book.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllBooksComponent,
  },
  {
    path: 'new',
    component: NewBookComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'update/:bookId',
    component: UpdateBookComponent,
    canActivate: [loggedInGuard],
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
