import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShowMoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  // Add  to the exports array so that they can be used in the main module and other modules.
  exports: [
    HeaderComponent,
    FooterComponent,
    ShowMoreComponent
  ]
})
export class SharedModule { }
