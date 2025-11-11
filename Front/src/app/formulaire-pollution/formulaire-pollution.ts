import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicePollution, Pollution } from '../services/pollution';
import { SimpleChanges } from '@angular/core';


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


export class FormulairePollution {

  // Formulaire principal
  formulaireGroup: FormGroup;

  // Pollution créée (pour l'affichage du récapitulatif)
  pollutionCreee?: Pollution;

  // Module pour passer les élements de l'utilisateur au composant recapitulatif-formulaire-pollution
  @Output() recapitulatif = new EventEmitter<any>();
  // evenement émis quand une pollution est ajoutée
  @Output() pollutionAjoutee = new EventEmitter<void>();

  @Input() pollution?: Pollution;


  ngOnChanges(changes: SimpleChanges): void {
    const pollutionChange = changes['pollution'];
    if (pollutionChange && pollutionChange.currentValue) {
      const p: Pollution = pollutionChange.currentValue;
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


  // Liste déroulante des différents type de pollution :
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
    // Injection du service de pollution
    private pollutionService: ServicePollution
  ) {
    // Création du formulaire pour les pollution via FormBuilder
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

onSubmit(): void {
  if (!this.formulaireGroup.valid) {
    console.log('formulaire invalide');
    this.formulaireGroup.markAllAsTouched();
    return;
  }

  const pollutionForm: Pollution = {
    ...this.pollution, // si on modifie, garde l'id
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
    // 🔹 Modification
    this.pollutionService.majPollution(this.pollution.id, pollutionForm).subscribe({
      next: (result) => {
        this.pollutionAjoutee.emit();
        this.formulaireGroup.reset();
      },
      error: (err) => console.error('Erreur modification :', err)
    });
  } else {
    // 🔹 Ajout
    this.pollutionService.ajouterPollution(pollutionForm).subscribe({
      next: (result) => {
        this.pollutionCreee = result;
        this.pollutionAjoutee.emit();
        this.formulaireGroup.reset();
      },
      error: (err) => console.error('Erreur ajout pollution :', err)
    });
  }
}
}