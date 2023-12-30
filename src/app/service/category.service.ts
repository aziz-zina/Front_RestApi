import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getCategories() {
    return this.httpClient.get<Category[]>(this.apiUrl + '/categories');
  }

  public addCategory(category: Category) {
    return this.httpClient.post(this.apiUrl + '/addCategory', category);
  }
}
