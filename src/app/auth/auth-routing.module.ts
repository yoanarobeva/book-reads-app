import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { loggedInGuard, notLoggedInGuard } from '../shared/guards/auth-guard.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [notLoggedInGuard],
    },
    {
      path: 'register',
      component: RegisterComponent,
      canActivate: [notLoggedInGuard],
    },
    {
      path: 'logout',
      component: LogoutComponent,
      canActivate: [loggedInGuard],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
