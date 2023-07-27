import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { UserCurrentCardComponent } from './user-current-card/user-current-card.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FriendsComponent,
    MyBooksComponent,
    UserCurrentCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
  ]
})
export class UserModule { }