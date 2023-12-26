import { Router, RouterModule } from '@angular/router';
import { CategoryService } from './../service/category.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  navigateToCategories() {
    this.router.navigate(['/categories']);
  }

  ngOnInit(): void {}
}
