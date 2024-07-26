import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8000/client';  // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const token = user.token;
      console.log('Token récupéré pour la requête:', token);  // Debugging
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();  // Retourne des en-têtes vides si aucun utilisateur connecté
  }

  createClient(clientData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('En-têtes de la requête:', headers);  // Debugging
    return this.http.post(`${this.apiUrl}/create/`, clientData, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du client:', error);  // Debugging
        return throwError(error);
      })
    );
  }
  getClients(): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('En-têtes de la requête:', headers);  // Debugging
    return this.http.get(`${this.apiUrl}/list/`, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des clients:', error);  // Debugging
        return throwError(error);
      })
    );
  }
  getRecentClients(): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('En-têtes de la requête:', headers);  // Debugging
    return this.http.get(`${this.apiUrl}/recent/`, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des clients:', error);  // Debugging
        return throwError(error);
      })
    );
  }


  // Ajoutez ici d'autres méthodes pour obtenir, mettre à jour et supprimer des clients
}
