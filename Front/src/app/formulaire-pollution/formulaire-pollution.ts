import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicePollution, Pollution } from '../services/pollution';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulaire-pollution',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formulaire-pollution.html',
  styleUrls: ['./formulaire-pollution.css'],
  standalone: true,
})
export class FormulairePollution implements OnInit, OnChanges {

  formulaireGroup: FormGroup;
  pollution?: Pollution;

  // Liste déroulante des différents types de pollution
  typeDePollutions = [
    'Plastique',
    'Chimique',
    'Dépôt sauvage',
    'Eau',
    'Air',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private pollutionService: ServicePollution,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulaireGroup = this.fb.group({
      titre: ['', Validators.required],
      type_pollution: [null, Validators.required],
      description: ['', Validators.required],
      date_observation: [null, Validators.required],
      lieu: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      photo_urlPollution: ['']
    });
  }

  ngOnInit(): void {
    // Si l'URL contient un ID, charger la pollution correspondante
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pollutionService.recuperationPollution(+id).subscribe(p => {
        this.pollution = p;
        this.formulaireGroup.patchValue({
          titre: p.titre,
          type_pollution: p.type_pollution,
          description: p.description,
          date_observation: p.date_observation,
          lieu: p.lieu,
          latitude: p.latitude,
          longitude: p.longitude,
          photo_urlPollution: p.photo_url || ''
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pollution'] && changes['pollution'].currentValue) {
      const p: Pollution = changes['pollution'].currentValue;
      this.formulaireGroup.patchValue({
        titre: p.titre,
        type_pollution: p.type_pollution,
        description: p.description,
        date_observation: p.date_observation,
        lieu: p.lieu,
        latitude: p.latitude,
        longitude: p.longitude,
        photo_urlPollution: p.photo_url || ''
      });
    }
  }

  onSubmit(): void {
    if (!this.formulaireGroup.valid) {
      this.formulaireGroup.markAllAsTouched();
      return;
    }

    const pollutionForm: Pollution = {
      ...this.pollution,
      titre: this.formulaireGroup.value.titre!,
      type_pollution: this.formulaireGroup.value.type_pollution!,
      description: this.formulaireGroup.value.description!,
      date_observation: this.formulaireGroup.value.date_observation!,
      lieu: this.formulaireGroup.value.lieu!,
      latitude: this.formulaireGroup.value.latitude!,
      longitude: this.formulaireGroup.value.longitude!,
      photo_url: this.formulaireGroup.value.photo_urlPollution || ''
    };

    if (this.pollution?.id) {
      // Modification
      this.pollutionService.majPollution(this.pollution.id, pollutionForm).subscribe({
        next: () => this.router.navigate(['/accueil']),
        error: err => console.error('Erreur modification :', err)
      });
    } else {
      // Ajout
      this.pollutionService.ajouterPollution(pollutionForm).subscribe({
        next: () => this.router.navigate(['/accueil']),
        error: err => console.error('Erreur ajout pollution :', err)
      });
    }
  }
}
