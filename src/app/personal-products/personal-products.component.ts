import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from './../service/product.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { DataTransportService } from '../service/data-transport.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-personal-products',
  standalone: true,
  imports: [],
  templateUrl: './personal-products.component.html',
  styleUrl: './personal-products.component.css',
})
export class PersonalProductsComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: number | undefined;
  private unsubscribe = new Subject<void>();
  count = 0;
  private toast = inject(HotToastService);

  constructor(
    private router: Router,
    private productService: ProductService,
    private dataTransport: DataTransportService
  ) {}

  ngOnInit(): void {
    console.log(this.dataTransport.getData());
    this.dataTransport.selectedProduct$.subscribe((data) => {
      console.log(data);
      this.selectedCategory = data;
      this.productService.getProductsByCategory(data).subscribe((value) => {
        console.log(data);
        this.products = value;
        if (this.products.length == 0) {
          this.toast.warning('This category has no products!');
        }
        this.count = this.products.length;
        console.log(this.products[0].category.name);
      });
    });
  }
}
