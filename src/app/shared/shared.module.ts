import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  // Add  to the exports array so that they can be used in the main module and other modules.
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
