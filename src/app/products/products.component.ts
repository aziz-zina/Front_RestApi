import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  goToAddProduct() {
    this.router.navigate(['/addProduct']);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      console.log(data[0].category);
      this.products = data;
    });
  }
}
