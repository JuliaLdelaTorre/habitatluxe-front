import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BlogRoutingModule } from './routing/blog-routing.module';





@NgModule({
  declarations: [
    BlogPageComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
