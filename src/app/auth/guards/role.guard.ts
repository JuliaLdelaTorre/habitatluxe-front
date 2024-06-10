import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['expectedRole'];
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || currentUser.user_type !== expectedRole) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
