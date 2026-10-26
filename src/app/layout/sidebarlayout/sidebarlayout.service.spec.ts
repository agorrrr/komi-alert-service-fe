import { TestBed } from '@angular/core/testing';

import { SidebarlayoutService } from './sidebarlayout.service';

describe('SidebarlayoutService', () => {
  let service: SidebarlayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarlayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
