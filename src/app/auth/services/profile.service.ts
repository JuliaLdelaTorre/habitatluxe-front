import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/app/environments/environments";

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private readonly baseUrl: string = environment.baseUrl;
  private readonly token = 'token';

  constructor( private http: HttpClient) { }

  getProfile() {
    const url = `${this.baseUrl}/profile`;
    return this.http.get(url);
  }

  updateProfile(data: any) {
    const url = `${this.baseUrl}/profile`;
    return this.http.put(url, data);
  }

  deleteProfile() {
    const url = `${this.baseUrl}/profile`;
    return this.http.delete(url);
  }

  changePassword(data: any) {
    const url = `${this.baseUrl}/profile/password`;
    return this.http.put(url, data);
  }
  
















} // class

