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
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PropertiesModule } from './properties/properties.module';



@NgModule({
    declarations: [
        AppComponent,
        AboutUsComponent,
        HomeComponent,
        MainLayoutComponent,


    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        PropertiesModule,
        AuthModule
    ]
})
export class AppModule { }
