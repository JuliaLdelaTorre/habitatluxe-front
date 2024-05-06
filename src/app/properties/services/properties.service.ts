import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, pipe } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Property } from '../interface/property.interface';

@Injectable({providedIn: 'root'})
export class PropertiesService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // ENPOINTS:
// all properties.
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/properties`);
  }

  // property by id.
  getPropertyById(id: number): Observable<Property | undefined> { // en algún punto puede que no exista el id.
    return this.http.get<Property>(`${this.baseUrl}/properties/${id}`)
    // Si hay un error, devolverá un observable con valor undefined.
    .pipe(
      catchError( error => of(undefined))
    );
  }

}

