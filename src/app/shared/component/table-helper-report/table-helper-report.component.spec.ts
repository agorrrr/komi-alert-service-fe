import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHelperReportComponent } from './table-helper-report.component';

describe('TableHelperReportComponent', () => {
  let component: TableHelperReportComponent;
  let fixture: ComponentFixture<TableHelperReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHelperReportComponent]
    });
    fixture = TestBed.createComponent(TableHelperReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
