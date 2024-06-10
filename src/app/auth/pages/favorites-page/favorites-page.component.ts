import { Component, OnInit } from '@angular/core';
import { Favorites } from '../../interfaces/favorites.interface';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { FavoriteService } from '../../services/favorite.service';
import { PropertiesService } from 'src/app/properties/services/properties.service';
import { Property } from 'src/app/properties/interface/property.interface';
import { Favorite } from 'src/app/properties/interface/favorite.interface';

@Component({
  selector: 'auth-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {


  public favorites: Property[] = [];
  public properties: Property [] = [];
  public property_id: number = 0;
  public user_id: number =  0;
  public userName: string = '';
  private readonly baseUrl: string = environment.baseUrl;


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private propertiesService: PropertiesService,
    private favoriteService: FavoriteService,

  ) { }

  ngOnInit(): void {
    this.getFavorite();
    this.userName = this.authService.getUserName() ?? '';
  }

  addFavorite() {
    this.favoriteService.addFavorite(this.property_id).subscribe(
      (response: any) => {
        console.log(response);
        this.favorites = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

getFavorite() {
  this.favoriteService.getAllFavorites().subscribe(
    (response: any) => {
      const favoriteIds = response.data.map((favorite: Favorite) => favorite.property_id);
      this.propertiesService.getProperties().subscribe(
        (response: any) => {
          this.favorites = response.data.filter((property: Property) => favoriteIds.includes(property.id));
        },
        (error) => {
          console.error(error);
        }
      );
    },
    (error) => {
      console.error(error);
    }
  );
}









} // class






// Configura las opciones de la petición - Germán.
// const opciones2 = {
//   method: 'POST', // Método de la petición
//   headers: {
//     'Content-Type': 'application/json', // Tipo de contenido
//     'Authorization': Bearer ${token}  // Token Bearer en la cabecera
//   },
//   body: JSON.stringify(favoriteData), // Convierte los datos a formato JSON
// };
