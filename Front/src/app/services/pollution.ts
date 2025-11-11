import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pollution 
{
  // L'ID sera géré automatiquement par json-server
  id?: number,
  titre: string;
  type_pollution: string;
  description: string;
  date_observation: string;
  lieu: string;
  latitude: number;
  longitude: number;
  photo_url?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ServicePollution 
{
  
  private apiUrl = 'https://apitemplate-latest-uhyg.onrender.com';

  constructor(private http: HttpClient) {}

  // Recuperation de toutes les pollutions
  recuperationToutePollution(): Observable<Pollution[]> 
  {
    return this.http.get<Pollution[]>(this.apiUrl + "/api/pollutions");
  }

  // Recuperation d'une pollution specifique
  recuperationPollution(id: number): Observable<Pollution> 
  {
    return this.http.get<Pollution>(`${this.apiUrl}/api/pollutions/${id}`);
  }

  // Ajouter une nouvelle pollution 
  ajouterPollution(p: Pollution): Observable<Pollution> 
  {
    return this.http.post<Pollution>(`${this.apiUrl}/api/pollutions`, p);
  }

  // Met à jour une pollution
  majPollution(id: number, p:Pollution): Observable<Pollution> 
  {
    return this.http.put<Pollution>(`${this.apiUrl}/api/pollutions/${id}`, p);
  }

  // Suppression d'une pollution
  suppressionPollution(id: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiUrl}/api/pollutions/${id}`);
  }
}