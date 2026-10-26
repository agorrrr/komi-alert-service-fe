import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighRiskCountryListComponent } from './high-risk-country-list.component';

describe('HighRiskCountryListComponent', () => {
  let component: HighRiskCountryListComponent;
  let fixture: ComponentFixture<HighRiskCountryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighRiskCountryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighRiskCountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
