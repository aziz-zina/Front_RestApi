import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl + '/products');
  }
}
