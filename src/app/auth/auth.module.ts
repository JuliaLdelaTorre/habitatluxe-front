import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ]
})
export class AuthModule { }
