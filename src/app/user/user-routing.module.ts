import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { MyBooksComponent } from './my-books/my-books.component';

const routes: Routes = [
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
    {
        path: 'my-books/:shelfName',
        component: MyBooksComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
