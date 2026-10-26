import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistAccListComponent } from './whitelist-acc-list.component';

describe('WhitelistAccListComponent', () => {
  let component: WhitelistAccListComponent;
  let fixture: ComponentFixture<WhitelistAccListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhitelistAccListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhitelistAccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
