import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFromJsonComponent } from './table-from-json.component';

describe('TableFromJsonComponent', () => {
  let component: TableFromJsonComponent;
  let fixture: ComponentFixture<TableFromJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableFromJsonComponent]
    });
    fixture = TestBed.createComponent(TableFromJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
