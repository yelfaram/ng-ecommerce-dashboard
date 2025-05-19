import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// service for product api instance at the root level
// since it's a singleton, it's only instantiated once and shared across the app (benefits from dependency injection)

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // url for api
  protected readonly url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // observable for data stream (api) and shareReplay to cache the data
  // => multiple subscriptions can be made so if multiple http requests are made (we use shareReplay to limit to one call)
  // The HTTP call is only executed upon subscription. Hence, multiple subscriptions = multiple HTTP calls.
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(shareReplay(1));
  }
}
