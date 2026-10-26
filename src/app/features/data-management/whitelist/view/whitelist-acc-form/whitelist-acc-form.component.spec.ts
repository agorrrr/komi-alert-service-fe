import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistAccFormComponent } from './whitelist-acc-form.component';

describe('WhitelistAccFormComponent', () => {
  let component: WhitelistAccFormComponent;
  let fixture: ComponentFixture<WhitelistAccFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhitelistAccFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhitelistAccFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
