import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from '../model/product';
import { Router } from '@angular/router';

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
    private productService: ProductService,
    private router: Router
  ) {}

  productsForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  private toast = inject(HotToastService);

  addProduct() {
    console.log(this.productsForm.value);
    if (
      this.productsForm.value.name == '' ||
      this.productsForm.value.price == null ||
      this.productsForm.value.quantity == 0 ||
      this.productsForm.value.category == '' ||
      this.productsForm.value.category == 'Select a Category please'
    ) {
      this.toast.warning('Please fill the whole form correctly!');
    } else {
      const payload: Product = {
        lib: this.productsForm.value.name,
        price: this.productsForm.value.price,
        qte: this.productsForm.value.quantity,
        category: {
          id_category: this.productsForm.value.category,
        },
      };
      this.productService.addProduct(payload).subscribe((data) => {
        console.log(data);
        this.toast.success('Product added successfully!');
        this.router.navigate(['/products']);
      });
    }
  }

  ngOnInit(): void {
    this.productsForm = this.fb.group({
      name: [''],
      price: [],
      quantity: [0],
      category: [''],
    });

    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
}
