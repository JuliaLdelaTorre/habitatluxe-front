import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page/list-page.component';
import { PropertiesRoutingModule } from './properties-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PropertyPageComponent } from './property-page/property-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { TruncatePipe } from '../shared/pipes/truncatePipe';



@NgModule({
  declarations: [
    ListPageComponent,
    PropertyPageComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    PropertiesRoutingModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ]
})
export class PropertiesModule { }
