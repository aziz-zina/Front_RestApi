import { DataTransportService } from './../service/data-transport.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private dataTransport: DataTransportService,
    private router: Router,
    private toast: HotToastService
  ) {}

  productsForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  data: any;

  ngOnInit(): void {
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state['data'];
    }
  }
}
