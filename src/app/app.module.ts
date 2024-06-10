import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from "./shared/shared.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { AuthModule } from './auth/auth.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PropertiesModule } from './properties/properties.module';
import { ContactComponent } from './contact/contact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoriteService } from './auth/services/favorite.service';
import { AuthService } from './auth/services/auth.service';
import { AuthInterceptor } from './auth/interceptor/interceptor';
import { PropertiesComponent } from './properties/components/properties.component';




@NgModule({
    declarations: [
        AppComponent,
        AboutUsComponent,
        HomeComponent,
        MainLayoutComponent,
        ContactComponent,
        



    ],
    providers: [
      AuthService,
      FavoriteService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        PropertiesModule,
        AuthModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,


    ]
})
export class AppModule { }
