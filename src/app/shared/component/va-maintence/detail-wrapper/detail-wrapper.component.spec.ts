import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWrapperComponent } from './detail-wrapper.component';

describe('DetailWrapperComponent', () => {
  let component: DetailWrapperComponent;
  let fixture: ComponentFixture<DetailWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailWrapperComponent]
    });
    fixture = TestBed.createComponent(DetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
