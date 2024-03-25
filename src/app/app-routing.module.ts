import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  // inicio de la aplicación (landing).
  { path: '', component: HomeComponent },
  // ruta a la página "Nosotros."
  { path: 'nosotros', component: NosotrosComponent },

  // Con carga perezosa, no se carga el módulo hasta que se navega a la ruta.
  { path: 'anuncios', loadChildren: () => import('./anuncios/anuncios.module').then(m => m.AnunciosModule) },
  { path: 'contacto', loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule)},
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},

  // cualquier otra ruta que no esté arriba, redirigir a home.
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


