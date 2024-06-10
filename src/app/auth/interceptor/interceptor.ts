
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg: string;

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMsg = `Error del lado del cliente: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMsg = `Error Code, error del lado el servidor: ${error.status}\nMessage del error del lado del servidor: ${error.message}`;
        }

        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}
