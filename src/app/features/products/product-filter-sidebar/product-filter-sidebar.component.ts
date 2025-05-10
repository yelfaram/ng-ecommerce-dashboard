import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { Filter } from '../../../models/filter.model';

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

  // ngOnChanges() responds to changes on input() so when its changed, it is invoked
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
  }
}
