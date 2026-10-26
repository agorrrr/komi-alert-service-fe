import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementDetailComponent } from './customer-management-detail.component';

describe('CustomerManagementDetailComponent', () => {
  let component: CustomerManagementDetailComponent;
  let fixture: ComponentFixture<CustomerManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerManagementDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
