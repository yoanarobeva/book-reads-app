import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m=> m.UserModule),
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m=> m.BooksModule),
  },
  // {
  //   path: '**', 
  //   component: NotFoundComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
