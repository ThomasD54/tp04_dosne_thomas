import { Routes } from '@angular/router';
import { FormulairePollution } from './formulaire-pollution/formulaire-pollution';
import { ListePollutionComponent } from './liste-des-pollutions/liste-des-pollutions';
import { FormulaireUtilisateur } from './formulaire-utilisateur/formulaire-utilisateur';
import { ListeUtilisateur } from './liste-utilisateur/liste-utilisateur';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: ListePollutionComponent },
  { path: 'pollution/ajouter', component: FormulairePollution },
  { path: 'formulaire-utilisateur', component: FormulaireUtilisateur },
  { path: 'liste-utilisateur', component: ListeUtilisateur },
  { path: 'pollution/modifier/:id', component: FormulairePollution },
  { path: '**', redirectTo: 'accueil' }
];
