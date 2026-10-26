import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobarlayoutComponent } from './nobarlayout.component';

describe('NobarlayoutComponent', () => {
  let component: NobarlayoutComponent;
  let fixture: ComponentFixture<NobarlayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NobarlayoutComponent]
    });
    fixture = TestBed.createComponent(NobarlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
