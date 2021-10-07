import { TestBed } from '@angular/core/testing';

import { AlcoholsService } from './alcohols.service';

describe('AlcoholsService', () => {
  let service: AlcoholsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlcoholsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
