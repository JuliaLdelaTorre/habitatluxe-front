import { Router } from '@angular/router';
import { Property } from '../interface/property.interface';
import { PropertiesService } from './../services/properties.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public properties: Property[] = [];
  public currentPage: number = 1;
  public pageSize: number = 3;
  public totalPages: number = 10;

  constructor(
    private propertiesService: PropertiesService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.propertiesService.getProperties()
      .subscribe( (response:any) => {
        this.properties = response.data;
        this.totalPages = Math.ceil(this.properties.length / this.pageSize);
      });
  }


  changePage(newPage: number) {
    this.currentPage = newPage;
  }

  goToPropertyDetails(id: number): void {
    this.router.navigate(['/properties/', id]);
  }

}

