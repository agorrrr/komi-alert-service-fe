import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarlayoutrefactorComponent } from './sidebarlayoutrefactor.component';

describe('SidebarlayoutrefactorComponent', () => {
  let component: SidebarlayoutrefactorComponent;
  let fixture: ComponentFixture<SidebarlayoutrefactorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarlayoutrefactorComponent]
    });
    fixture = TestBed.createComponent(SidebarlayoutrefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
