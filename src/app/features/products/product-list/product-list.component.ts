import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  // DI of product service and makes use of observable to fetch from api
  readonly products$ = inject(ProductService).getAllProducts();

  constructor() {}

  productById(index: number, product: Product): number {
    return product.id;
  }
}
