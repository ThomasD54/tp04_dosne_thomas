import { Component, OnInit } from '@angular/core';
import { Pollution, ServicePollution } from '../services/pollution';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-des-pollutions',
  templateUrl: './liste-des-pollutions.html',
  styleUrls: ['./liste-des-pollutions.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListePollutionComponent implements OnInit {
  pollutions: Pollution[] = [];
  pollutionEnConsultation?: Pollution;
  afficherPopup = false;

  constructor(private pollutionService: ServicePollution, private router: Router) {}

  ngOnInit(): void {
    this.chargerPollutions();
  }

  chargerPollutions() {
    this.pollutionService.recuperationToutePollution().subscribe(data => {
      this.pollutions = data;
    });
  }

  supprimerPollution(id: number) {
    if (confirm('Supprimer la pollution ?')) {
      this.pollutionService.suppressionPollution(id).subscribe(() => {
        this.pollutions = this.pollutions.filter(p => p.id !== id);
      });
    }
  }

  consulterPollution(id: number) {
    this.pollutionService.recuperationPollution(id).subscribe(p => {
      this.pollutionEnConsultation = p;
      this.afficherPopup = true;
    });
  }

  fermerPopup() {
    this.afficherPopup = false;
    this.pollutionEnConsultation = undefined;
  }

  // Redirige vers le formulaire pour créer une nouvelle pollution
  ajouterPollution() {
    this.router.navigate(['/pollution/ajouter']);
  }

  // Redirige vers le formulaire pour modifier une pollution existante
  modifierPollution(id: number) {
    this.router.navigate([`/pollution/modifier/${id}`]);
  }
}
