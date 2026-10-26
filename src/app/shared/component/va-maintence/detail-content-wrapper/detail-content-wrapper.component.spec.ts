import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailContentWrapperComponent } from './detail-content-wrapper.component';

describe('DetailContentWrapperComponent', () => {
  let component: DetailContentWrapperComponent;
  let fixture: ComponentFixture<DetailContentWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailContentWrapperComponent]
    });
    fixture = TestBed.createComponent(DetailContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
