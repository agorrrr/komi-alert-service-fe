import { TestBed } from '@angular/core/testing';

import { TopbarlayoutService } from './topbarlayout.service';

describe('TopbarlayoutService', () => {
  let service: TopbarlayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopbarlayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
