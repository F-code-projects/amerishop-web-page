import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ShoppingCar } from '../../features/shopping_car/models/shopping_car.model';
import { ShoppingCarService } from '../../features/shopping_car/services/shopping_car.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    OverlayBadgeModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  carAmount = 0;

  constructor(private shoppingCarService: ShoppingCarService) {}

  ngOnInit() {
    this.shoppingCarService.items$.subscribe((amount) => {
      this.carAmount = amount;
    });
  }

  getCarList() {
    const shoppingCar = localStorage.getItem('shoppingCar');
    if (shoppingCar) {
      const sc: ShoppingCar = JSON.parse(shoppingCar);
      this.carAmount = sc.shoppingCarItems.length;
    }
  }

  updateCarAmount() {
    this.carAmount = this.shoppingCarService.getTotalItems();
  }
}
