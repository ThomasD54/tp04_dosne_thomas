import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceUtilisateur, Utilisateur } from '../services/utilisateur';

@Component({
  selector: 'app-formulaire-utilisateur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulaire-utilisateur.html',
  styleUrls: ['./formulaire-utilisateur.css']
})

export class FormulaireUtilisateur {

  @Output() utilisateurCree = new EventEmitter<void>();

  formulaireGroup: FormGroup;

  constructor(private fb: FormBuilder, private serviceUtilisateur: ServiceUtilisateur) {
    // Création du formulaire de création d'utilisateur
    this.formulaireGroup = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (!this.formulaireGroup.valid) {
      console.log('Formulaire invalide');
      this.formulaireGroup.markAllAsTouched();
      return;
    }

    const utilisateurForm: Utilisateur = {
      nom: this.formulaireGroup.value.nom!,
      prenom: this.formulaireGroup.value.prenom!,
      login: this.formulaireGroup.value.login!,
      pass: this.formulaireGroup.value.pass!
    };

    // Création d’un nouvel utilisateur
    this.serviceUtilisateur.ajouterUtilisateur(utilisateurForm).subscribe({
      next: (result) => {
        console.log('Utilisateur ajouté :', result);
        this.utilisateurCree.emit();
        this.formulaireGroup.reset();
      },
      error: (err) => console.error('Erreur ajout utilisateur :', err)
    });
  }
}