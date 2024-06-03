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
  login(email: string, password: string, userType: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    console.log(`Haciendo solicitud a ${url} con cuerpo`, body, 'y opciones', options);

    return this.http.post<LoginResponse>(url, body, options).pipe(
      switchMap((loginResponse: LoginResponse) => {
        const token = loginResponse.token;
        // Si el tipo de usuario es admin, se agrega el token al cuerpo de la solicitud
        if (userType === 'admin_user') {
          const adminUrl = `${this.baseUrl}/login`;
          const adminBody = { email, password, token }; // incluye el token en el cuerpo de la solicitud
          return this.http.post<LoginResponse>(adminUrl, adminBody, options);
        } else {
          return of(loginResponse); // Si no es admin, simplemente retorna la respuesta original del login
        }
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



