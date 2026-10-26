import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReportsComponent } from './table-reports.component';

describe('TableReportsComponent', () => {
  let component: TableReportsComponent;
  let fixture: ComponentFixture<TableReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableReportsComponent]
    });
    fixture = TestBed.createComponent(TableReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
