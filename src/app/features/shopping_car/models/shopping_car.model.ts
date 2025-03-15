import { ShoppingCarItem } from "./shopping_car_item.model";

export interface ShoppingCar {
  shoppingCarItems: ShoppingCarItem[];
  totalPrice: number;
}
