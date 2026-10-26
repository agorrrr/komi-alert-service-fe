import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementListComponent } from './customer-management-list.component';

describe('CustomerManagementListComponent', () => {
  let component: CustomerManagementListComponent;
  let fixture: ComponentFixture<CustomerManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerManagementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
