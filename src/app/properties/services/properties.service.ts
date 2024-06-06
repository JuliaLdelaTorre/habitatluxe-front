import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, pipe } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Property } from '../interface/property.interface';
import { tap } from 'rxjs/operators';
import { Favorite } from '../interface/favorite.interface';

@Injectable({providedIn: 'root'})
export class PropertiesService {

  private baseUrl = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  // ENPOINTS:
// all properties.
  // getProperties(): Observable<Property[]> {
  //   const url = `${this.baseUrl}/properties`;
  //   let respuesta = this.http.get<Property[]>(url);
  //   return respuesta;
  // }

  getProperties(): Observable<Property[]> {
    const url = `${this.baseUrl}/properties`;
    return this.http.get<Property[]>(url)
    // .pipe(
    //   tap( respuesta => console.log(respuesta) )
    // );
  }



  // property by id.
  getPropertyById(id: number): Observable<Property | undefined> {
 // en algún punto puede que no exista el id.
    const url = `${this.baseUrl}/properties/${id}`;
    let respuesta = this.http.get<Property>(url);
    return respuesta
    // Si hay un error, devolverá un observable con valor undefined.
    .pipe(
      catchError( error => of(undefined))
    );
  }

  // POST favorite.
  saveFavorite(property_id:number, user_id:number): Observable<Favorite> | undefined{
    const url = `${this.baseUrl}/favorites`;
    const body = {property_id, user_id};
    console.log('Guardando en favoritos: ', body);
    let respuesta = this.http.post<Favorite>(url, body);
    console.log('respuesta de guardar en favoritos: ', respuesta);
    return respuesta;
  }




} // end class

