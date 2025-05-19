import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { Filter } from '../../../models/filter.model';
import { Price } from '../../../models/price.model';
import { UserFilter } from '../../../models/user-filter.model';

@Component({
  selector: 'app-product-filter-sidebar',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    CommonModule,
  ],
  templateUrl: './product-filter-sidebar.component.html',
  styleUrl: './product-filter-sidebar.component.scss',
})
export class ProductFilterSidebarComponent {
  // for max price, grab it from product service list (make sure it is multiple of 10)
  // for category, grab it from product service list and just get them all as options
  // make an object for category key: value = category (use regex to remove spaces and make it lowercase): category name

  filters!: Filter;

  @Input() products: Product[] = [];
  @Output() filtersApplied = new EventEmitter<UserFilter>();

  // ngOnChanges() responds to changes on Input() so when its changed, it is invoked
  ngOnChanges() {
    if (!this.products) return; // empty array

    const maxPrice = Math.max(...this.products.map((product) => product.price));
    const roundedMaxPrice = Math.ceil(maxPrice / 10) * 10; // round to nearest multiple of 10

    const categories = [
      ...new Set(this.products.map((product) => product.category)),
    ].map((category) => {
      const regex = /[\W]+/g; // select non-word characters
      const key = category.toLowerCase().replace(regex, '-');
      return { key: key, label: category };
    });

    this.filters = {
      categories: categories,
      maxPrice: roundedMaxPrice,
    };

    // default values when price is null
    if (this.selectedPriceMin() === null || this.selectedPriceMax() === null) {
      this.selectedCategory.set('');
      this.selectedPriceMin.set(0);
      this.selectedPriceMax.set(roundedMaxPrice);
    }
  }

  // we need writable signals that we set on change (for each filter)
  // => track state of sidebar
  selectedCategory: WritableSignal<string | null> = signal(null);
  selectedPriceMin: WritableSignal<number | null> = signal(null);
  selectedPriceMax: WritableSignal<number | null> = signal(null);
  selectedRating: WritableSignal<number | null> = signal(null);

  // use readonly for computed signals as they shouldn't be reassigned
  // combines min and max values (gets updated when any of the signal it reads change)
  readonly selectedPrice: Signal<Price> = computed(() => ({
    min: this.selectedPriceMin(),
    max: this.selectedPriceMax(),
  }));

  // combine all filters which will be exposed to parent as output
  readonly activeFilters: Signal<UserFilter> = computed(() => ({
    category: this.selectedCategory(),
    price: this.selectedPrice(),
    rating: this.selectedRating(),
  }));

  // reset signals
  clearAllFilters() {
    this.selectedCategory.set(null);
    this.selectedPriceMin.set(null);
    this.selectedPriceMax.set(null);
    this.selectedRating.set(null);

    this.filtersApplied.emit({
      category: null,
      price: { min: null, max: null },
      rating: null,
    });
  }

  // emit filter event
  applyFilters() {
    this.filtersApplied.emit(this.activeFilters());
  }
}
