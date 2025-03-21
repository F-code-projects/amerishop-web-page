import { Component, signal, Input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products/services/products.service';
import { Product } from '../../products/model/product.model';
import { ShoppingCarService } from '../../shopping_car/services/shopping_car.service';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    DataViewModule,
    TagModule,
    CommonModule,
    SelectButtonModule,
    FormsModule,
    ButtonModule,
    SkeletonModule,
    CarouselModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryId: string = '';
  products = signal<any>([]);

  constructor(
    private productService: ProductsService,
    private shoppingCarService: ShoppingCarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('categoryId') || '';

      if (!this.categoryId) {
        this.productService.getAll().subscribe((data) => {
          this.products.set(data);
        });
      } else {
        this.productService
          .getProductByCategory(this.categoryId)
          .subscribe((data) => {
            this.products.set(data);
          });
      }
    });
  }

  addItemToShoppingCar(product: Product) {
    this.shoppingCarService.addItemToShoppingCar(product);
  }

  getImageArray(imageUrls: string): string[] {
    return imageUrls ? imageUrls.split(';').map((url) => url.trim()) : [];
  }
}
