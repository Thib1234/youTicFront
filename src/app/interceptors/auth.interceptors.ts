import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../tools/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', req.url);

    if (!req.url.includes('api/token/') && !req.url.includes('register/') && !req.url.includes('accounts/register/') && !req.url.includes('cbeapi.be/api/v1/company/')) {
      if (this.authService.isLoggedIn()) {
        console.log('User is logged in, adding Authorization header');
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        console.log('User is not logged in, redirecting to login');
        this.router.navigate(['/login']); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      }
    }
    return next.handle(req);
  }
}
