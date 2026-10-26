import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementEditComponent } from './customer-management-edit.component';

describe('CustomerManagementEditComponent', () => {
  let component: CustomerManagementEditComponent;
  let fixture: ComponentFixture<CustomerManagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerManagementEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
