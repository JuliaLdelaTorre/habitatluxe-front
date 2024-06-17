
import { Router } from '@angular/router';
import { Property } from '../interface/property.interface';
import { PropertiesService } from './../services/properties.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../auth/interfaces/loginResponse.interface';
import { set } from 'animejs';
import { Favorite } from '../interface/favorite.interface';
import { FavoriteService } from 'src/app/auth/services/favorite.service';
import { Subject } from 'rxjs';
import { ThemeService } from 'src/app/pages/home/theme.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  @Input() properties: Property[] = [];
  public favorites: { [key: number]: boolean } = {};
  public currentPage: number = 1;
  public pageSize: number = 3;
  public totalPages: number = 10;
  public showMore: boolean = false;
  public isLiked = false;

  lightMode: boolean = true;
  lightModeSubject!: Subject<boolean>;


  constructor(
    private propertiesService: PropertiesService,
    private favoriteService: FavoriteService,
    private router: Router,
    private themeService: ThemeService,
  ) {
    this.themeService.lightModeSubject.subscribe(value => {
      this.lightMode = value;
    })
  }


  ngOnInit(): void {
    this.favoriteService.getAllFavorites().subscribe(() => {
      this.propertiesService.getProperties().subscribe((response: any) => {
        this.properties = response.data;
        this.properties = this.properties.map(property => ({
          ...property,
          showMore: false,
          isLiked: this.favoriteService.getFavoriteStatus(property.id)
        }));
        this.totalPages = Math.ceil(this.properties.length / this.pageSize);
      });
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

 save(id: number): void {
  console.log('save method called with id:', id);
  event?.stopPropagation();

  const property = this.properties.find(property => property.id === id);
  if (!property) {
    console.error('Property not found');
    return;
  }
  property.isLiked = !property.isLiked;
  if (property.isLiked) {
    this.favoriteService.addFavorite(property.id).subscribe(
      (response: any) => {
        console.log('addFavorite response:', response);
        this.favorites = response.data;
        console.log('favorites:', this.favorites);
        this.favoriteService.setFavoriteStatus(property.id, true);
      },
      (error) => {
        console.error('addFavorite error:', error);
      }
    );
  } else {
    this.favoriteService.deleteFavorite(property.id).subscribe(
      (response: any) => {
        console.log('removeFavorite response:', response);
        if (Array.isArray(this.favorites)){
        // Actualizar la lista de favoritos después de eliminar
        this.favorites = this.favorites.filter(favorite => favorite.idFav !== property.id);
        } else {
          this.favorites = [];
        }
      },
      (error) => {
        console.error('removeFavorite error:', error);
      }
    );
  }
}

}



