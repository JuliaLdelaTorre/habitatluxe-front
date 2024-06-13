import { Component, OnInit } from '@angular/core';
import { Blog } from '../../interface/blog.interface';
import { BlogService } from '../../services/blog.service';
import { Subject } from 'rxjs';
import { ThemeService } from 'src/app/pages/home/theme.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit{

  public blog: Blog[] = []; // el array de posts.

  lightMode: boolean = true;
  lightModeSubject!: Subject<boolean>;

  constructor( 
    private blogService: BlogService,
    private themeService: ThemeService,
   ) {
    this.themeService.lightModeSubject.subscribe( value => {
      this.lightMode = value;
    })
    }

  ngOnInit(): void {
    this.blogService.getBlog()
    .subscribe((response: any) => {
      this.blog = response.data;
    });
  }

}
