import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home.page.component';
import { CategoriesComponent } from './features/categories/components/categories.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomePageComponent },
    { path: 'category/:categoryId', component: CategoriesComponent },
];
