import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "src/app/environments/environments";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private readonly baseUrl: string = environment.baseUrl;

  getAllFavorites() {
    const url = `${this.baseUrl}/favorite`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }

  getFavoriteById(id: number) {
    const url = `${this.baseUrl}/favorite/${id}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(url, { headers });
  }

  addFavorite(property_id: number,) {
    const url = `${this.baseUrl}/favorite`;
    const body = { property_id};
    return this.http.post(url, body);
  }

  deleteFavorite(id: number) {
    const url = `${this.baseUrl}/favorite/${id}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(url, { headers });
  }
}
