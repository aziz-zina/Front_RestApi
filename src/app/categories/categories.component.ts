import { CategoryService } from './../service/category.service';
import { Component, inject } from '@angular/core';
import { Category } from '../model/category';
import { PersonalProductsComponent } from '../personal-products/personal-products.component';
import { DataTransportService } from '../service/data-transport.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [PersonalProductsComponent, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories: Category[] = [];
  selectedCategoryId: number;
  display: boolean = false;
  selectedCategory: Category | undefined;
  selectedCategoryName: string = '';
  categoryForm: FormGroup = new FormGroup({});
  private toast = inject(HotToastService);

  constructor(
    private categoryService: CategoryService,
    private dataTransport: DataTransportService,
    private fb: FormBuilder
  ) {}

  selectedCategoryFunction(id: number) {
    this.display = false;
    console.log(id);
    this.selectedCategoryId = id;
    this.display = true;
    this.dataTransport.setData(this.selectedCategoryId);
  }

  editCategory1(category: Category) {
    console.log(category);
    this.selectedCategory = category;
    this.selectedCategoryName = category.name;
    console.log(this.selectedCategory);

    // Update the form values here
    this.categoryForm.patchValue({
      name: this.selectedCategoryName,
    });
  }

  editCategory2() {
    console.log(this.categoryForm.value);
    if (this.categoryForm.value.name == '') {
      this.toast.warning('Please provide a name for the category!');
    } else {
      const payload: Category = {
        id_category: this.selectedCategory?.id_category,
        name: this.categoryForm.value.name,
      };
      this.categoryService.updateCategory(payload).subscribe(
        (data) => {
          this.toast.success('Category updated successfully!');
          this.categoryService.getCategories().subscribe((data) => {
            console.log(data);
            this.categories = data;
          });
          this.selectedCategoryFunction(payload.id_category ?? 0);
        },
        (err) => {
          this.toast.error('An error has occured! ' + err.name);
        }
      );
    }
  }

  deleteCategory(category: Category) {
    console.log(category);
    this.selectedCategory = category;
    this.selectedCategoryName = category.name;
    this.selectedCategoryId = category.id_category ?? 0;
    console.log(this.selectedCategory);
  }

  deleteCategory2() {
    this.categoryService.deleteCategory(this.selectedCategoryId).subscribe(
      (data) => {
        this.toast.success('Category deleted successfully!');
        this.categoryService.getCategories().subscribe((data) => {
          console.log(data);
          this.categories = data;
        });
      },
      (error) => {
        this.toast.error('An error has occured! ' + error.name);
      }
    );
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [''],
    });
    this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }
}
