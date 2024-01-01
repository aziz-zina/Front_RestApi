import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PersonalProductsComponent } from './personal-products/personal-products.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateProductComponent } from './update-product/update-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  //{ path: 'categories', component: PersonalProductsComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'updateProduct', component: UpdateProductComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
