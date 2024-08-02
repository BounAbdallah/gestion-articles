import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Assurez-vous que le chemin est correct

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Fournir HttpClient
    provideRouter(routes) // Fournir le routeur avec les routes définies
  ]
}).catch(err => console.error(err));
