import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { NewBookComponent } from './new-book/new-book.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllBooksComponent,
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
  },
  {
    path: 'new-book',
    component: NewBookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
