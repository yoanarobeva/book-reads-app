import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralHomeComponent } from './core/general-home/general-home.component';
import { loggedInGuard, notLoggedInGuard } from './shared/guards/auth-guard.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: GeneralHomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m=> m.UserModule),
    canActivate: [loggedInGuard],
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m=> m.BooksModule),
  },
  {
    path: '**', 
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
