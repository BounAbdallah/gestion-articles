// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ArticleService } from '../article.service';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-article-form',
//   standalone: true,
//   imports: [CommonModule,RouterModule,ReactiveFormsModule, HttpClientModule],
//   templateUrl: './article-form.component.html',
//   styleUrl: './article-form.component.css'
// })
// export class ArticleFormComponent implements OnInit {
//   articleForm: FormGroup;
//   isEditMode = false;
//   articleId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private articleService: ArticleService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.articleForm = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(5)]],
//       body: ['', [Validators.required, Validators.minLength(10)]]
//     });
//   }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.articleId = +params['id'];
//       if (this.articleId) {
//         this.isEditMode = true;
//         this.articleService.getArticle(this.articleId).subscribe(article => {
//           this.articleForm.patchValue(article);
//         });
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.isEditMode && this.articleId) {
//       this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe(() => {
//         this.router.navigate(['/']);
//       });
//     } else {
//       this.articleService.createArticle(this.articleForm.value).subscribe(() => {
        
//         this.router.navigate(['/']);
//       });
//     }
//   }
// }