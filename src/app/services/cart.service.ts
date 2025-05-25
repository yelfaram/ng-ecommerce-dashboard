import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

// since we want to communicate between cart and product components, we will make use of
// a shared service (non-parent-child relation between components) and an observable

// why subject? we can listen and emit events
// Cart Service will manage the cart state as an observable (centralized state management)
// => when addToCart is called, it will emit that product added
// => on the cart component level, we want to listen to those subject emits (subscribe to subject observable)

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart[]>([]);

  // setter
  addToCart(product: Product) {
    const currentCart = this.cart$.value;

    const existingItem = currentCart.find(
      (item) => item.product.id == product.id
    );

    const updatedCart = existingItem
      ? currentCart.map((item) =>
          item.product.id == product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...currentCart, { product: product, quantity: 1 }];

    this.cart$.next(updatedCart); // emits event to all subscribers
  }

  removeFromCart(product: Product) {
    const currentCart = this.cart$.value;

    const updatedCart = currentCart
      .map((item) =>
        item.product.id == product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ) // decrement quantity
      .filter((item) => item.quantity > 0); // remove items with quantity 0

    this.cart$.next(updatedCart); // emits event to all subscribers
  }

  clearCart() {
    this.cart$.next([]);
  }

  // getter
  getCart$(): Observable<Cart[]> {
    return this.cart$.asObservable(); // exposes cart as an observable stream to which other components can subscribe to
  }

  // getter
  getCartItemCount$(): Observable<number> {
    return this.cart$.pipe(
      // pipe side effect
      map((item) => item.reduce((total, item) => total + item.quantity, 0))
    );
  }
}
