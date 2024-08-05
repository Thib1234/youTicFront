// register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/accounts/register/';  // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string, nom_societe: string, num_bce: string, adresse: string, ville: string, code_postal: string, telephone: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, email, password, nom_societe, num_bce, adresse, ville, code_postal, telephone });
  }
}
