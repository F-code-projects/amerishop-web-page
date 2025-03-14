import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { CategoriesService } from '../../categories/services/categories.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule, CommonModule, CardModule, DataViewModule],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.css',
})
export class HomePageComponent {
  categories = signal<any>([]);
  layout: 'list' | 'grid' = 'list';

  constructor(private categoryService: CategoriesService) {}

  ngOnInit() {
    this.categoryService.getAll().subscribe((data) => (this.categories.set(data)));
    window.addEventListener('resize', () => {
      this.layout = window.innerWidth > 425 ? 'grid' : 'list';
      ;
    });
  }

  navigateToCategory(id: number) {
    window.location.href = `https://www.tienda.com/categoria/${id}`;
  }
}
