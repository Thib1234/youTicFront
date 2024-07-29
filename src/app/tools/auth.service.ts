import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface User {
    id: number;
    username: string;
    token: string;
    status: string;
    // autres champs nécessaires
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
        const isBrowser = isPlatformBrowser(this.platformId);
        let storedUser = null;
        if (isBrowser) {
            storedUser = localStorage.getItem('token');
        }

    }

    login(username: string, password: string): Observable<any> {
      return this.http.post<any>(`http://localhost:8000/api/token/`, { username, password })
          .pipe(
              map(response => {
                  console.log('Token reçu du serveur:', response.access);
                  // localStorage.setItem('token', (response.token));
                  const isBrowser = isPlatformBrowser(this.platformId);
                  if (isBrowser) {
                    let tok = JSON.stringify(response.access);
                    tok = tok.replaceAll('\"','');
                    console.log('tok');

                    console.log(tok);
                    localStorage.setItem('token', tok);
                  }
                  this.router.navigate(['/dashboard']);
                  return response;
              }),
              catchError(error => {
                  console.error('Login error:', error);
                  return throwError(error);
              })
          );
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem('token');
}

    logout(): void {
        const isBrowser = isPlatformBrowser(this.platformId);
        if (isBrowser) {
            localStorage.removeItem('currentUser');
        }
    }

    isLoggedIn(): boolean {
      const isBrowser = isPlatformBrowser(this.platformId);
      if (isBrowser) {
          const currentUser = localStorage.getItem('token');

          return currentUser ? currentUser !== null : false;
      }
      return false;
  }


}
