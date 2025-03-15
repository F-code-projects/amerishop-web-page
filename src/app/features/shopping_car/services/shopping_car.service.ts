import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environments';
import { ShoppingCar } from '../models/shopping_car.model';
import { ShoppingCarItem } from '../models/shopping_car_item.model';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../products/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCarService {
  private itemsSubject = new BehaviorSubject<number>(0);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateItemsCount();
  }

  addItemToShoppingCar(product: Product) {
    let shoppingCar: ShoppingCar = this.getShoppingCar();

    const existingItem = shoppingCar.shoppingCarItems.find(
      (item) => item.product.product_id === product.product_id
    );

    if (existingItem) {
      existingItem.amount += 1;
    } else {
      const shoppingCarItem: ShoppingCarItem = {
        product: product,
        amount: 1,
      };
      shoppingCar.shoppingCarItems.push(shoppingCarItem);
    }

    shoppingCar.totalPrice = this.calculateTotalPrice(shoppingCar);
    this.saveShoppingCarToLocalStorage(shoppingCar);
    this.updateItemsCount(); 
  }

  removeItemFromShoppingCar(product: Product) {
    let shoppingCar: ShoppingCar = this.getShoppingCar();

    shoppingCar.shoppingCarItems = shoppingCar.shoppingCarItems.filter(
      (item) => item.product.product_id !== product.product_id
    );

    console.log(product)
    console.log(shoppingCar)

    shoppingCar.totalPrice = this.calculateTotalPrice(shoppingCar);
    this.saveShoppingCarToLocalStorage(shoppingCar);
    this.updateItemsCount();
  }

  updateShoppingCarItemAmount(shoppingCar: ShoppingCar) {
    shoppingCar.totalPrice = this.calculateTotalPrice(shoppingCar);
    this.saveShoppingCarToLocalStorage(shoppingCar);
    this.updateItemsCount();
  }

  getTotalItems(): number {
    const shoppingCar = this.getShoppingCar();
    return shoppingCar.shoppingCarItems.reduce(
      (total, item) => total + item.amount,
      0
    );
  }

  getShoppingCar(): ShoppingCar {
    if (typeof localStorage !== 'undefined') {
      const carList = localStorage.getItem('shoppingCar');
      if (carList) {
        return JSON.parse(carList);
      }
    }
    return { shoppingCarItems: [], totalPrice: 0 };
  }

  private saveShoppingCarToLocalStorage(shoppingCar: ShoppingCar) {
    localStorage.setItem('shoppingCar', JSON.stringify(shoppingCar));
  }

  private calculateTotalPrice(shoppingCar: ShoppingCar): number {
    return shoppingCar.shoppingCarItems.reduce(
      (total, item) => total + item.product.price * item.amount,
      0
    );
  }

  private updateItemsCount() {
    const totalItems = this.getTotalItems();
    this.itemsSubject.next(totalItems);
  }
}
