import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistAccListComponent } from './blacklist-acc-list.component';

describe('BlacklistAccListComponent', () => {
  let component: BlacklistAccListComponent;
  let fixture: ComponentFixture<BlacklistAccListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistAccListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlacklistAccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
