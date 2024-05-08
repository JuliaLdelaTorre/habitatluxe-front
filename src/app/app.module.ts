import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { AuthModule } from './auth/auth.module';



@NgModule({
    declarations: [
        AppComponent,
        AboutUsComponent,
        HomeComponent,


    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        AuthModule
    ]
})
export class AppModule { }
