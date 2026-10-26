import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarlayoutComponent } from './topbarlayout.component';

describe('TopbarlayoutComponent', () => {
  let component: TopbarlayoutComponent;
  let fixture: ComponentFixture<TopbarlayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarlayoutComponent]
    });
    fixture = TestBed.createComponent(TopbarlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
