import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterSidebarComponent } from './product-filter-sidebar.component';

describe('ProductFilterSidebarComponent', () => {
  let component: ProductFilterSidebarComponent;
  let fixture: ComponentFixture<ProductFilterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilterSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
