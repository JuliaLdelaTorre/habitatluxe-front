import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth-routing/auth-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { PropertiesModule } from "../properties/properties.module";
import { AdminComponent } from './pages/admin/admin.component';




@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        ProfilePageComponent,
        FavoritesPageComponent,
        AppointmentPageComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        PropertiesModule
    ]
})
export class AuthModule { }
