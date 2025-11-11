import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouteConfigLoadEnd } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, 
{
  providers: 
  [
    // permet l'utilisation de HttpClient dans toute l'application
    provideHttpClient(),
    // Pour les formulaires réactifs
    importProvidersFrom(ReactiveFormsModule),
    // Pour la navigation (surrement utile pour plus tard) -------------------------------
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));