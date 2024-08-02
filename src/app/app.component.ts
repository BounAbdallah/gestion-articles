import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Importer HttpClientModule et provideHttpClient
import { bootstrapApplication } from '@angular/platform-browser';
import { ArticleListComponent } from './article-list/article-list.component';
import { NavbarComponent } from './navbar/navbar.component'; // Importer NavbarComponent
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule, // Inclure HttpClientModule
    ArticleListComponent,
    ArticleDetailComponent,
    NavbarComponent // Inclure NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-articles';
}

// Démarrage de l'application
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // Fournir HttpClient
}).catch(err => console.error(err));
