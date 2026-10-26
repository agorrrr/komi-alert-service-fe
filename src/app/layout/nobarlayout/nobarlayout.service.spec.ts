import { TestBed } from '@angular/core/testing';

import { NobarlayoutService } from './nobarlayout.service';

describe('NobarlayoutService', () => {
  let service: NobarlayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NobarlayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
