import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterSidebarComponent } from './product-filter-sidebar/product-filter-sidebar.component';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

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
  readonly products$ = inject(ProductService).getAllProducts();
}
