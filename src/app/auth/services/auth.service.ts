import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Register } from '../interfaces/register.interface';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // LOGIN
  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap((resp: LoginResponse) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));
        })
      );
    }

  // REGISTER
  register(username: string, email: string, password: string): Observable<Register> {
    const url = `${this.baseUrl}/register`;
    const body = { username, email, password };
    return this.http.post<Register>(url, body)
  }

  // LOGOUT
  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    return of(true);
  }

  // IS LOGGED
  isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  //GET USER - devuelve el username del usuario logueado.
  getUsername() {
    const user = localStorage.getItem('user');
    if (user) {
      const currentUser = JSON.parse(user);
      return currentUser.username;
    }
    return null;
  }

  // GET USER_TYPE
  getUserType() {
    const user = localStorage.getItem('user');
    if (user) {
      const currentUser = JSON.parse(user);
      return currentUser.user_type;
    }
    return null;
  }

} // AuthService



