import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { GeneralHomeComponent } from './general-home/general-home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WantToReadCardComponent } from './want-to-read-card/want-to-read-card.component';
import { CurrentReadCardComponent } from './current-read-card/current-read-card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserHomeComponent,
    GeneralHomeComponent,
    ActivityCardComponent,
    NotFoundComponent,
    WantToReadCardComponent,
    CurrentReadCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
