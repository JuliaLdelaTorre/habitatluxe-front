import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLogged().pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          // Si no está autenticado, redirige a la página de login
          this.router.navigate(['/login']);
          return false;
        }
        return true; // Si está autenticado, permite el acceso.
      })
    );
  }
}
