import { Router } from '@angular/router';
import { Property } from '../interface/property.interface';
import { PropertiesService } from './../services/properties.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/interfaces/loginResponse.interface';
import { set } from 'animejs';
import { Favorite } from '../interface/favorite.interface';
import { FavoriteService } from 'src/app/auth/services/favorite.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {


  public properties: Property[] = [];
  public favorites: Favorite[] = [];
  public currentPage: number = 1;
  public pageSize: number = 3;
  public totalPages: number = 10;
  public showMore: boolean = false;


  constructor(
    private propertiesService: PropertiesService,
    private favoriteService: FavoriteService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.propertiesService.getProperties()
      .subscribe( (response:any) => {
        this.properties = response.data;
        this.properties = this.properties.map(property => ({
          ...property, showMore: false
        }))
        this.totalPages = Math.ceil(this.properties.length / this.pageSize);
      });
  }


  changePage(newPage: number) {
    this.currentPage = newPage;
  }

  goToPropertyDetails(id: number): void {
    this.router.navigate(['/properties/', id]);
  }

  public toggleShowMore(event: Event, property: Property): void {
    event.stopPropagation();
   property.showMore = !property.showMore;
    }


  //TODO: Implementar la función save para guardar una propiedad como favorita.
  // save(id: number):void {
  //   event?.stopPropagation();
  //   localStorage.setItem('property_id', id.toString());

  //   const property_id = localStorage.getItem('property_id');
  //   const user = localStorage.getItem('user');
  //     if (user) {
  //       const currentUser = JSON.parse(user);
  //       const user_id = currentUser.id;
  //       this.favoriteService.addFavorite(Number(property_id), user_id).subscribe(
  //         (response: any) => {
  //           console.log(response);
  //           this.favorites = response.data;
  //           console.log(this.favorites);
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       );
  //     }
  //   }

  save(id: number): void {
  console.log('save method called with id:', id);
  event?.stopPropagation();
  localStorage.setItem('property_id', id.toString());

  const property_id = localStorage.getItem('property_id');
  console.log('property_id:', property_id);

  const user = localStorage.getItem('currentUser');
  console.log('user:', user);

  if (user) {
    const currentUser = JSON.parse(user);
    console.log('currentUser:', currentUser);

    const user_id = currentUser.id;
    console.log('user_id:', user_id);

    this.favoriteService.addFavorite(Number(property_id)).subscribe(
      (response: any) => {
        console.log('addFavorite response:', response);
        this.favorites = response.data;
        console.log('favorites:', this.favorites);
      },
      (error) => {
        console.error('addFavorite error:', error);
      }
    );
  } else {
    console.log('No user found in localStorage');
  }
}
}

