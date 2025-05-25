import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, MatCardModule, MatChipsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  // child component of product list which receives input
  @Input() product!: Product;

  cartService = inject(CartService);

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
