import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { MyBooksComponent } from './my-books/my-books.component';

const routes: Routes = [
  {
    path: 'all-books',
    component: AllBooksComponent,
  },
  {
    path: 'my-books',
    component: MyBooksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
