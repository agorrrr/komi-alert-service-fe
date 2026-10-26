import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryDetailFormComponent } from './dictionary-detail-form.component';

describe('DictionaryDetailFormComponent', () => {
  let component: DictionaryDetailFormComponent;
  let fixture: ComponentFixture<DictionaryDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryDetailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
