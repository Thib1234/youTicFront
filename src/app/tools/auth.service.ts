import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface User {
    id: number;
    email: string;
    token: string;
    // autres champs nécessaires
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`http://localhost:8000/accounts/login/`, { email, password })
          .pipe(
              map(response => {
                  if (response.status === 'error') {
                      throw new Error(response.message);  // Lancer une erreur si l'authentification échoue
                  }
                  // Si l'authentification réussit, stocker les informations de l'utilisateur
                  localStorage.setItem('currentUser', JSON.stringify(response));
                  this.currentUserSubject.next(response);
                  return response;
              }),
              catchError(error => {
                  console.error('Login error:', error);
                  return throwError(error);  // Propager l'erreur pour être gérée dans le composant
              })
          );
  }


    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isLoggedIn(): boolean {
        return this.currentUserValue !== null;
    }
}
