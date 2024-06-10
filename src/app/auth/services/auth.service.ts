import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/app/environments/environments';

import { LoginResponse, User } from '../interfaces/loginResponse.interface';
import { Register } from '../interfaces/register.interface';
import { LoginData } from '../interfaces/loginData.interface';


@Injectable({ providedIn: 'root' })

export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private readonly token = 'token';
  private readonly currentUser = 'currentUser';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());

  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // devuelve true si hay token.
  private hasToken(): boolean {
    return !!localStorage.getItem(this.token);
  }

  // devuelve el valor del token
  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  // devuelve el usuario actual.
  private getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUser);
    return user ? JSON.parse(user) : null;
  }

  getUserName(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.username : null;
  }

  getUserId(): number | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.id : null;
  }

  getUserType(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.user_type : null;
  }

  login(loginData: LoginData): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<LoginResponse>(url, loginData)
      .pipe(
        tap((resp: LoginResponse) => {
          localStorage.setItem(this.token, resp.token);
          localStorage.setItem('currentUser', JSON.stringify(resp.user));
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(resp.user);
        })
      );
  }


  register(username: string, email: string, password: string): Observable<Register> {
    const url = `${this.baseUrl}/register`;
    const body = { username, email, password };
    return this.http.post<Register>(url, body)
  }

  logout(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.currentUser);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }
} // AuthService



