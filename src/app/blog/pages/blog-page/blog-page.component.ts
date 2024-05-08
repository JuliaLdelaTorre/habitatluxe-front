import { Component, OnInit } from '@angular/core';
import { Blog } from '../../interface/blog.interface';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
})
export class BlogPageComponent implements OnInit{

  public blog: Blog[] = []; // el array de posts.

  constructor( private blogService: BlogService ) { }

  // array - con json-sever
  // ngOnInit(): void {
  //   this.blogService.getBlog()
  //   .subscribe( blog => this.blog = blog)
  // }

//objeto - con backend laravel.
  ngOnInit(): void {
    this.blogService.getBlog()
    .subscribe((response: any) => {
      this.blog = response.data;
    });
  }

}
