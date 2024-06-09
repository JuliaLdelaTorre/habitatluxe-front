import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

import { LoginPageComponent } from '../auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from '../auth/pages/register-page/register-page.component';
import { ProfilePageComponent } from '../auth/pages/profile-page/profile.component';
import { FavoritesPageComponent } from '../auth/pages/favorites-page/favorites-page.component';
import { AppointmentPageComponent } from '../auth/pages/appointment-page/appointment-page.component';


//localhost/auth/
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
      { path: 'favorites', component: FavoritesPageComponent, canActivate: [AuthGuard]},
      { path: 'appointments', component: AppointmentPageComponent, canActivate: [AuthGuard]},

      { path: '**', redirectTo: 'home' }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class AuthRoutingModule { }
