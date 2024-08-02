import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  paginatedArticles: Article[] = [];
  articleForm: FormGroup;
  isEditMode = false;
  articleId: number | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 2;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe({
      next: (data: Article[]) => {
        console.log('Articles fetched:', data);
        this.articles = data;
        this.setPage(1);
        this.route.params.subscribe(params => {
          this.articleId = +params['id'];
          if (this.articleId) {
            this.isEditMode = true;
            this.articleService.getArticle(this.articleId).subscribe(article => {
              this.articleForm.patchValue(article);
            });
          }
        });
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
      }
    });
  }

 onSubmit(): void {
  if (this.isEditMode && this.articleId) {
    this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  } else {
    this.articleService.createArticle(this.articleForm.value).subscribe((newArticle: Article) => {
      console.log('Nouvel article:', newArticle);
      this.articles.unshift(newArticle); // Ajouter le nouvel article au début de la liste
      this.setPage(1); // Réinitialiser la pagination
      this.router.navigate(['/']);
    });
  }
}

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedArticles = this.articles.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.articles.length) {
      this.setPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
}
