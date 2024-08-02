import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  imports: [CommonModule, RouterModule, HttpClientModule], // Ajoutez CommonModule ici

})

export class ArticleDetailComponent implements OnInit {
  article?: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticle(+id).subscribe(data => {
        this.article = data;
      });
    }
  }

  deleteArticle(): void {
    if (this.article) {
      this.articleService.deleteArticle(this.article.id!).subscribe(() => {
        this.router.navigate(['/articles']);
      });
    }
  }
}
