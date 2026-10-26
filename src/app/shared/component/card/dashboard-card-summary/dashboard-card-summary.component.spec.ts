import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardSummaryComponent } from './dashboard-card-summary.component';

describe('DashboardCardSummaryComponent', () => {
  let component: DashboardCardSummaryComponent;
  let fixture: ComponentFixture<DashboardCardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCardSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
