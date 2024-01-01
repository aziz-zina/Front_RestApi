import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProductId: number = 0;
  selectedProductName: string = '';
  private toast = inject(HotToastService);

  constructor(private productService: ProductService, private router: Router) {}

  goToAddProduct() {
    this.router.navigate(['/addProduct']);
  }

  sendId(product: Product) {
    this.selectedProductId = product?.idProduct ?? 0;
    this.selectedProductName = product.lib;
    console.log(this.selectedProductId);
  }

  deleteProduct() {
    this.productService.deleteProduct(this.selectedProductId).subscribe(
      (data) => {
        this.products = this.products.filter(
          (product) => product.idProduct != this.selectedProductId
        );
        this.toast.success('Product deleted successfully!');
      },
      (error) => {
        console.log(error);
        this.toast.error('An error has occured! ' + error.name);
      }
    );
  }

  goToEdit(item: Product) {
    this.router.navigate(['/updateProduct'], { state: { data: item } });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      console.log(data[0].category);
      this.products = data;
    });
  }
}
