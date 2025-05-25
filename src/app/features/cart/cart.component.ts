import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartService = inject(CartService);

  cart$: Observable<Cart[]> = this.cartService.getCart$();

  increaseQuantity(product: Product) {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: Product) {
    this.cartService.removeFromCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getCartTotal(cart: Cart[]) {
    return cart
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  }
}
