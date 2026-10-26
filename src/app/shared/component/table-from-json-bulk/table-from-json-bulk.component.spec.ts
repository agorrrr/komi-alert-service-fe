import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFromJsonBulkComponent } from './table-from-json-bulk.component';

describe('TableFromJsonBulkComponent', () => {
  let component: TableFromJsonBulkComponent;
  let fixture: ComponentFixture<TableFromJsonBulkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableFromJsonBulkComponent]
    });
    fixture = TestBed.createComponent(TableFromJsonBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
