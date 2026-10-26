import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryDetailFormImportComponent } from './dictionary-detail-form-import.component';

describe('DictionaryDetailFormImportComponent', () => {
  let component: DictionaryDetailFormImportComponent;
  let fixture: ComponentFixture<DictionaryDetailFormImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryDetailFormImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryDetailFormImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
