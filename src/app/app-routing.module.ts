import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PropertyPageComponent } from './properties/property-page/property-page.component';
import { ListPageComponent } from './properties/list-page/list-page.component';

const routes: Routes = [
  // inicio de la aplicación (landing).
  { path: '', component: HomeComponent },
  // ruta a la página "Home."
  { path: 'home', component: HomeComponent },
  // ruta a la página "Nosotros."
  { path: 'aboutUs', component: AboutUsComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // { path: 'login', component: LoginPageComponent },
      // { path: 'register', component: RegisterPageComponent },
      // { path: 'properties', component: ListPageComponent},
      { path: 'properties/:id', component: PropertyPageComponent},

      // Con carga perezosa, no se carga el módulo hasta que se navega a la ruta.
      { path: 'properties', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },
      { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
      { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
      { path: 'auth', loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule) },


      // cualquier otra ruta que no esté arriba, redirigir a home.
      { path: '**', redirectTo: '/home' }
    ]
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


