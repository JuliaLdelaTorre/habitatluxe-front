import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/aboutUs/aboutUs.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  // inicio de la aplicación (landing).
  { path: '', component: HomeComponent },
  // ruta a la página "Nosotros."
  { path: 'aboutUs', component: AboutUsComponent},

  // Con carga perezosa, no se carga el módulo hasta que se navega a la ruta.
  { path: 'properties', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)},
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},

  // cualquier otra ruta que no esté arriba, redirigir a home.
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


