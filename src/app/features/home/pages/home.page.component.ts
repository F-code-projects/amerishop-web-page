import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';
import { CategoriesService } from '../../categories/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../categories/model/category.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    DataViewModule,
    SkeletonModule,
  ],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.css',
})
export class HomePageComponent {
  categories = signal<any>([]);
  layout: 'list' | 'grid' = 'list';

  constructor(
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe((data) => this.categories.set(data));
    window.addEventListener('resize', () => {
      this.layout = window.innerWidth > 425 ? 'grid' : 'list';
    });
  }

  navigateToCategory(category: Category) {
    this.router.navigate(['/category', category.category_id], {});
  }

  navigateToAllCategory() {
    this.router.navigate(['/category']);
  }
}
