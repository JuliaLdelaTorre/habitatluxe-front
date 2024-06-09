import { Component, OnInit } from '@angular/core';
import { Favorites } from '../../interfaces/favorites.interface';

@Component({
  selector: 'auth-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit{

  public favorites: Favorites[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
//TODO: EJEMPLO PARA MANDAR EL TOKEN EN LA CABEZERA.
// getData() {
//   const token = this.authService.getToken();
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

//   return this.http.get('/api/data', { headers });
// }
