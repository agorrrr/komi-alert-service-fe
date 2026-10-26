import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHelperBulkComponent } from './table-helper-bulk.component';

describe('TableHelperBulkComponent', () => {
  let component: TableHelperBulkComponent;
  let fixture: ComponentFixture<TableHelperBulkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHelperBulkComponent]
    });
    fixture = TestBed.createComponent(TableHelperBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
