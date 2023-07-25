import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserHomeComponent,
    ActivityCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
  ]
})
export class UserModule { }