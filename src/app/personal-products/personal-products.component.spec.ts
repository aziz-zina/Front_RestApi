import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProductsComponent } from './personal-products.component';

describe('PersonalProductsComponent', () => {
  let component: PersonalProductsComponent;
  let fixture: ComponentFixture<PersonalProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
