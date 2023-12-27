import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  productsForm: FormGroup = new FormGroup({});
  categories: Category[] = [];

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      name: [''],
      price: [''],
      quantity: [''],
      category: [''],
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
