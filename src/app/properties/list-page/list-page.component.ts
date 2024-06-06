import { Router } from '@angular/router';
import { Property } from '../interface/property.interface';
import { PropertiesService } from './../services/properties.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/interfaces/loginResponse.interface';

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

  save(id: number):void {
    event?.stopPropagation();
    localStorage.setItem('property_id', id.toString());
    const property_id = localStorage.getItem('property_id');
    const user = localStorage.getItem('user');
      if (user) {
        const currentUser = JSON.parse(user);
        const user_id = currentUser.id;
        this.propertiesService.saveFavorite(+property_id!, +user_id);
      }
    }

}

