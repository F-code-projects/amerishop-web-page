import { Product } from "../../products/model/product.model";

export interface ShoppingCarItem {
  product: Product;
  amount: number;
}
