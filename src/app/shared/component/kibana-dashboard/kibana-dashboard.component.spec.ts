import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KibanaDashboardComponent } from './kibana-dashboard.component';

describe('KibanaDashboardComponent', () => {
  let component: KibanaDashboardComponent;
  let fixture: ComponentFixture<KibanaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KibanaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KibanaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
