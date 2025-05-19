import { Component, computed, inject, Signal, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterSidebarComponent } from './product-filter-sidebar/product-filter-sidebar.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { UserFilter } from '../../models/user-filter.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [
    MatSidenavModule,
    ProductListComponent,
    ProductFilterSidebarComponent,
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  // DI of product service and makes use of observable to fetch from api
  readonly products$ = inject(ProductService);

  // a stateful, reactive holder/variable => signals
  // child product-filter emits an event to parent (something happened - filters changed)
  // parent now needs to react to it => need signal

  // original product list
  readonly products = signal<Product[]>([]);

  readonly activeFilters = signal<UserFilter>({
    category: null,
    price: { min: null, max: null },
    rating: null,
  });

  readonly filteredProducts: Signal<Product[]> = computed(() => {
    return this.applyFilters(this.products(), this.activeFilters());
  });

  constructor() {
    // initialize products list with api observable
    this.products$
      .getAllProducts()
      .subscribe((data) => this.products.set(data));
  }

  applyFilters(products: Product[], filters: UserFilter): Product[] {
    const noFiltersApplied =
      !filters.category &&
      !filters.price?.min &&
      !filters.price?.max &&
      !filters.rating;

    if (noFiltersApplied) return products;

    return products.filter(
      (product) =>
        (!filters.category || product.category == filters.category) &&
        (!filters.price?.min || product.price >= filters.price.min) &&
        (!filters.price?.max || product.price <= filters.price.max) &&
        (!filters.rating || Math.floor(product.rating.rate) >= filters.rating)
    );
  }

  // react to child and hold the state (for product filter use)
  onFiltersChanged(filters: UserFilter) {
    this.activeFilters.set(filters);
  }
}
