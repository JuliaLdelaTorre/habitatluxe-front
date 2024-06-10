import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BlogPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

  ]
})
export class BlogModule { }
