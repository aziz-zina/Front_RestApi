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

  public addProduct(product: Product) {
    return this.httpClient.post<Product>(this.apiUrl + '/addProduct', product);
  }

  public getProductsByCategory(id: any) {
    return this.httpClient.get<Product[]>(
      this.apiUrl + '/getProductsByCategoy/' + id
    );
  }
}
