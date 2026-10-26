import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHelperComponent } from './table-helper.component';

describe('TableHelperComponent', () => {
  let component: TableHelperComponent;
  let fixture: ComponentFixture<TableHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHelperComponent]
    });
    fixture = TestBed.createComponent(TableHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
