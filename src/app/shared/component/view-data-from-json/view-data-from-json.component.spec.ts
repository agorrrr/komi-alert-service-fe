import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDataFromJsonComponent } from './view-data-from-json.component';

describe('ViewDataFromJsonComponent', () => {
  let component: ViewDataFromJsonComponent;
  let fixture: ComponentFixture<ViewDataFromJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDataFromJsonComponent]
    });
    fixture = TestBed.createComponent(ViewDataFromJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
