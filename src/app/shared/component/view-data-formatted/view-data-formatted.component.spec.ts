import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDataFormattedComponent } from './view-data-formatted.component';

describe('ViewDataComponent', () => {
  let component: ViewDataFormattedComponent;
  let fixture: ComponentFixture<ViewDataFormattedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDataFormattedComponent]
    });
    fixture = TestBed.createComponent(ViewDataFormattedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
