import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceUtilisateur, Utilisateur } from '../services/utilisateur';

@Component({
  selector: 'app-liste-utilisateur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-utilisateur.html',
  styleUrls: ['./liste-utilisateur.css']
})
export class ListeUtilisateur implements OnInit {
  utilisateurs: Utilisateur[] = [];

  constructor(private serviceUtilisateur: ServiceUtilisateur) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.serviceUtilisateur.recuperationTousUtilisateurs()
      .subscribe({
        next: (data) => this.utilisateurs = data,
        error: (err) => console.error('Erreur récupération utilisateurs:', err)
      });
  }
}
