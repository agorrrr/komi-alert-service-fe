import { TestBed } from '@angular/core/testing';

import { HighRiskCountryService } from './high-risk-country.service';

describe('HighRiskCountryService', () => {
  let service: HighRiskCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighRiskCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
