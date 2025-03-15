import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home.page.component';
import { CategoriesComponent } from './features/categories/components/categories.component';
import { ShoppingCarPageComponent } from './features/shopping_car/pages/shopping-car.page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomePageComponent },
    { path: 'category/:categoryId', component: CategoriesComponent },
    { path: 'category', component: CategoriesComponent },
    { path: 'shoppingCar', component: ShoppingCarPageComponent },
];
