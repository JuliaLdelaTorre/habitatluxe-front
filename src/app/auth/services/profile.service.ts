import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/app/environments/environments";
import { Profile } from "../interfaces/profile.interface";

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private readonly baseUrl: string = environment.baseUrl;
  private readonly token = 'token';

  constructor( private http: HttpClient)  { }

  getProfile():Observable<Profile> {
    const url = `${this.baseUrl}/user-profile`;
    return this.http.get<Profile>(url);
  }

  updateProfile(updatedProfile: Profile): Observable<Profile> {
    const url = `${this.baseUrl}/users/${updatedProfile.user_id}`;
    console.log('datos enviados del perfil actualizado:', updatedProfile)
    return this.http.put<Profile>(url, updatedProfile);
  }

  deleteProfile(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users${userId}`;
    return this.http.delete(url);
  }

  changePassword(data: any) {
    const url = `${this.baseUrl}users${data.id}`;
    return this.http.put(url, data);
  }

















} // class

