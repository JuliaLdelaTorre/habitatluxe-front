import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$
      .pipe(
        take(1), //toma solo el primer valor. Evita fugas de memoria.
        map(isAuthenticated => { //map transforma el valor de isAuthenticated a un booleano, que canActivate espera.
          if (!isAuthenticated) {
            this.router.navigate(['/auth/login']);
            return false;
          }
          return true;
        })
      );
  }
}
