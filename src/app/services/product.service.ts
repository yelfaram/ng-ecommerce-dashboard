import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // url for api
  protected readonly url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // observable for data stream (api)
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}
