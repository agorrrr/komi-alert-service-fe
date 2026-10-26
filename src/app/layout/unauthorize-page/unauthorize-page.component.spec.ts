import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizePageComponent } from './unauthorize-page.component';

describe('UnauthorizePageComponent', () => {
  let component: UnauthorizePageComponent;
  let fixture: ComponentFixture<UnauthorizePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorizePageComponent]
    });
    fixture = TestBed.createComponent(UnauthorizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
