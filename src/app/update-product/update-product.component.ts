import { DataTransportService } from './../service/data-transport.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../model/category';
import { HotToastService } from '@ngneat/hot-toast';
import { Product } from '../model/product';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  product: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private dataTransport: DataTransportService,
    private router: Router,
    private dataTransfer: DataTransportService
  ) {}

  productsForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  data: any;
  private toast = inject(HotToastService);

  updateProduct() {
    console.log(this.productsForm.value);
    if (
      this.productsForm.value.name == '' ||
      this.productsForm.value.price == null ||
      this.productsForm.value.quantity < 0 ||
      this.productsForm.value.category == '' ||
      this.productsForm.value.category == 'Select a Category please'
    ) {
      this.toast.warning('Please fill the whole form correctly!');
    } else {
      const payload: Product = {
        idProduct: this.product.idProduct,
        lib: this.productsForm.value.name,
        price: this.productsForm.value.price,
        qte: this.productsForm.value.quantity,
        category: {
          id_category: this.productsForm.value.category,
        },
      };
      console.log(payload);
      this.productService.updateProduct(payload).subscribe(
        (data) => {
          console.log(data);
          this.toast.success('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log(error);
          this.toast.error('An error has occured! ' + error.name);
        }
      );
    }
  }

  ngOnInit(): void {
    this.product = this.dataTransfer.getProduct().value;
    console.log(this.product.idProduct);
    if (this.product == 0) {
      this.toast.warning('Please select a product first!');
      this.router.navigate(['/products']);
    }
    this.productsForm = this.fb.group({
      name: [this.product.lib],
      price: [this.product.price],
      quantity: [this.product.qte],
      category: [this.product.category.id_category],
    });
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
}
