import { TestBed } from '@angular/core/testing';

import { JsonTransformerServiceService } from './json-transformer-service.service';

describe('JsonTransformerServiceService', () => {
  let service: JsonTransformerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonTransformerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
