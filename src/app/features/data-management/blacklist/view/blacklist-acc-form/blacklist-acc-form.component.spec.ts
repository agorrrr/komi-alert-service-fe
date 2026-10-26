import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistAccFormComponent } from './blacklist-acc-form.component';

describe('BlacklistAccFormComponent', () => {
  let component: BlacklistAccFormComponent;
  let fixture: ComponentFixture<BlacklistAccFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlacklistAccFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlacklistAccFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
