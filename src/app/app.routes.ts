import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    component: HomeComponent,
  },
  {
    path: 'products',
    title: 'Product Page',
    component: ProductListComponent,
  },
];
