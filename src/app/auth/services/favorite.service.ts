
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "src/app/environments/environments";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Favorites } from "src/app/auth/interfaces/favorites.interface";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private readonly baseUrl: string = environment.baseUrl;

 getAllFavorites():Observable<Favorites[]> {
  const url = `${this.baseUrl}/favorite`;
  return this.http.get<Favorites[]>(url);
}

addFavorite(property_id: number,):Observable<Favorites[]> {
  const url = `${this.baseUrl}/favorite`;
  const body = { property_id };
  return this.http.post<Favorites[]>(url, body);
}

deleteFavorite(id: number):Observable<Favorites[]> {
  const url = `${this.baseUrl}/favorite/${id}`;
  return this.http.delete<Favorites[]>(url);
}
}
