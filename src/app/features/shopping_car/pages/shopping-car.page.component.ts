import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { ShoppingCarService } from '../services/shopping_car.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCar } from '../models/shopping_car.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ShoppingCarItem } from '../models/shopping_car_item.model';
import { Product } from '../../products/model/product.model';

@Component({
  selector: 'app-shopping-car.page',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
  ],
  templateUrl: './shopping-car.page.component.html',
  styleUrl: './shopping-car.page.component.css',
})
export class ShoppingCarPageComponent {
  shoppingCar = signal<ShoppingCar>({ shoppingCarItems: [], totalPrice: 0 });

  options = ['list', 'grid'];

  constructor(
    private shoppingCarService: ShoppingCarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.shoppingCar.set(this.shoppingCarService.getShoppingCar());
  }

  addItemToShoppingCar(product: Product) {
    this.shoppingCarService.addItemToShoppingCar(product);
  }

  removeItemFromShoppingCar(shoppingCarItem: ShoppingCarItem) {
    this.shoppingCarService.removeItemFromShoppingCar(shoppingCarItem.product);
    this.shoppingCar.set(this.shoppingCarService.getShoppingCar());
  }

  incrementDecrementValue() {
    this.shoppingCarService.updateShoppingCarItemAmount(this.shoppingCar());
  }

  sendShippingMessage() {
    const shoppingCar = this.shoppingCar();
    let message = 'RESUMEN DE TU COMPRA\n';
    message += '========================\n\n';

    shoppingCar.shoppingCarItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name.trim()}\n`;
      message += `   Cantidad: ${item.amount}\n`;
      message += `   Precio: S/. ${item.product.price.toFixed(2)}\n\n`;
    });

    message += '------------------------\n';
    message += `TOTAL A PAGAR: S/. ${shoppingCar.totalPrice.toFixed(2)}\n\n`;
    message += 'Gracias por tu compra.\n';
    message += 'Esperamos tu confirmación por WhatsApp.';

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '+51926711737'; // Número de destino
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
}
