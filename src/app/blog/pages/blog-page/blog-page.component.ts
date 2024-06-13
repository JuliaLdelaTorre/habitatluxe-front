import { Component, OnInit } from '@angular/core';
import { Blog } from '../../interface/blog.interface';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit{

  public blog: Blog[] = []; // el array de posts.

  constructor( private blogService: BlogService ) { }

  ngOnInit(): void {
    this.blogService.getBlog()
    .subscribe((response: any) => {
      this.blog = response.data;
    });
  }

}
