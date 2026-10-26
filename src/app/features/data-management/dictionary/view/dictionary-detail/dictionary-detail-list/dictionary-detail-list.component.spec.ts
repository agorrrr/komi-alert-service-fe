import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryDetailListComponent } from './dictionary-detail-list.component';

describe('DictionaryDetailListComponent', () => {
  let component: DictionaryDetailListComponent;
  let fixture: ComponentFixture<DictionaryDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DictionaryDetailListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
