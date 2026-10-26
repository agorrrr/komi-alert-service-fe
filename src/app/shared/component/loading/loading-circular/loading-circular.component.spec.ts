import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCircularComponent } from './loading-circular.component';

describe('LoadingCircularComponent', () => {
  let component: LoadingCircularComponent;
  let fixture: ComponentFixture<LoadingCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingCircularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
