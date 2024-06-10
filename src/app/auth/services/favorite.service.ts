import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { environment } from "src/app/environments/environments";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private readonly baseUrl: string = environment.baseUrl;

 getAllFavorites():Observable<any> {
  const url = `${this.baseUrl}/favorite`;
  return this.http.get(url);
}

addFavorite(property_id: number,):Observable<any> {
  const url = `${this.baseUrl}/favorite`;
  const body = { property_id };
  return this.http.post(url, body);
}

deleteFavorite(id: number):Observable<any> {
  const url = `${this.baseUrl}/favorite/${id}`;
  return this.http.delete(url);
}
}
