import { CategoryService } from './../service/category.service';
import { Component } from '@angular/core';
import { Category } from '../model/category';
import { PersonalProductsComponent } from '../personal-products/personal-products.component';
import { DataTransportService } from '../service/data-transport.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [PersonalProductsComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories: Category[] = [];
  selectedCategory: number | undefined;
  display: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private dataTransport: DataTransportService
  ) {}

  selectedCategoryFunction(id: number) {
    this.display = false;
    console.log(id);
    this.selectedCategory = id;
    this.display = true;
    this.dataTransport.setData(this.selectedCategory);
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
}
