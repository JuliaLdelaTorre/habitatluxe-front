import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { PropertiesRoutingModule } from './properties-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { }
