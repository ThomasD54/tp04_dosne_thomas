import { Routes } from '@angular/router';
import { FormulairePollution } from './formulaire-pollution/formulaire-pollution';

export const routes: Routes = [
  { path: 'formulaire', component: FormulairePollution },
  { path: '**', redirectTo: '' }
];
