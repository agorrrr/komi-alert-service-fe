import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHelperLazyComponent } from './table-helper-lazy.component';

describe('TableHelperLazyComponent', () => {
  let component: TableHelperLazyComponent;
  let fixture: ComponentFixture<TableHelperLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHelperLazyComponent]
    });
    fixture = TestBed.createComponent(TableHelperLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
