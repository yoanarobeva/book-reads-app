import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    ActivityCardComponent,
    ProfileComponent,
    FriendsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
  ]
})
export class UserModule { }