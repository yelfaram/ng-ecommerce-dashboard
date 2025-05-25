import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    component: HomeComponent,
  },
  {
    path: 'products',
    title: 'Product Page',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    title: 'Cart Page',
    component: CartComponent,
  },
];
