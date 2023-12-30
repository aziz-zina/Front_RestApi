import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Category } from '../model/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  categoriesForm: FormGroup = new FormGroup({});
  private toast = inject(HotToastService);

  addProduct() {
    console.log(this.categoriesForm.value);
    if (this.categoriesForm.value.name == '') {
      this.toast.warning('Please provide a name for the category!');
    } else {
      const payload: Category = {
        name: this.categoriesForm.value.name,
      };
      console.log(payload);
      this.categoryService.addCategory(payload).subscribe(
        (data) => {
          console.log(data);
          this.toast.success('Category added successfully!');
          this.router.navigate(['/categories']);
        },
        (error) => {
          console.log(error);
          this.toast.error('An error has occured! ' + error.name);
        }
      );
    }
  }

  ngOnInit(): void {
    this.categoriesForm = this.fb.group({
      name: [''],
    });
  }
}
