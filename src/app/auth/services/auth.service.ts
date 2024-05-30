import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { LoginResponse } from '../interfaces/loginResponse.interface';

@Injectable({providedIn: 'root'})

export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  // propiedades privadas para almacenar el estado de la autenticación.
  // comienzan con _  sólo para indicar que son privadas.

  // private _currentUser = signal<User | null>(null);
  // private _authStatus = signal<AuthStatus>();


  constructor() { }

  // login(email: string, password: string): Observable<boolean> {

  //   const url = `${this.baseUrl}/auth/login`;
  //   const body = { email, password };


  //    return this.http.post<LoginResponse>(url, body)
  //    .pipe(
  //     tap( ({ user, token })  => {
  //       this._
  //     })
  //    )


  // }
}
