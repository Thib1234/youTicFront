import { AuthService } from './../tools/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isLoggedIn(); // Vérifie si l'utilisateur est connecté
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
      return false;
    }
  }

}
