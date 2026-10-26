import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalConfirmationComponent } from './approval-confirmation.component';

describe('ApprovalConfirmationComponent', () => {
  let component: ApprovalConfirmationComponent;
  let fixture: ComponentFixture<ApprovalConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalConfirmationComponent]
    });
    fixture = TestBed.createComponent(ApprovalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
