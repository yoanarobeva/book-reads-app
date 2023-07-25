import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { MyBooksComponent } from './my-books/my-books.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        component: UserHomeComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'friends',
        component: FriendsComponent,
    },
    {
        path: 'my-books',
        component: MyBooksComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
