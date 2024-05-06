import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { PropertyPageComponent } from './property-page/property-page.component';

// localhost/properties/
const routes: Routes = [
  {
    path: '',
    component: ListPageComponent,
    children: [
      // si añado más rutas hijas, éste debe ir al final, porque si no tomará cualquier cosa como un id.
      { path: ':id', component: PropertyPageComponent }, // localhost/properties/1
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class PropertiesRoutingModule { }
