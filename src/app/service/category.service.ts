import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getCategories() {
    console.log(this.httpClient.get<Category[]>(this.apiUrl + '/categories'));
    return this.httpClient.get<Category[]>(this.apiUrl + '/categories');
  }
}
