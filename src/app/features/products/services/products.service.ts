import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environments';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  httpUrl = `${environment.API_URL}/products`;

  getAll() {
    return this.http.get<Array<Product>>(`${this.httpUrl}?select=*`);
  }

  getProductByCategory(categoryId: string) {
    let url = `${this.httpUrl}?category_id=eq.${categoryId}&select=*,brand(*)`;
    return this.http.get<Array<Product>>(`${url}`);	
  }
}
