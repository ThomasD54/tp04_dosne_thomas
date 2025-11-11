import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  login: string;
  motdepasse: string;
  email?: string; // optionnel si ton backend génère l'email
}

@Injectable({
  providedIn: 'root'
})
export class ServiceUtilisateur {
  private apiUrl = 'https://apitemplate-latest-uhyg.onrender.com';

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  recuperationTousUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl + '/api/utilisateurs');
  }

  // Ajouter un utilisateur
  ajouterUtilisateur(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl + '/api/utilisateurs', user);
  }

  // Récupérer un utilisateur par id
  recuperationUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/api/utilisateurs/${id}`);
  }
}
