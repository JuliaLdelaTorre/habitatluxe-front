import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, pipe } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Property } from '../interface/property.interface';
import { tap } from 'rxjs/operators';

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
    .pipe(
      tap( respuesta => console.log(respuesta) )
    );
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

}

