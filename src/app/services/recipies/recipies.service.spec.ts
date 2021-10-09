import { TestBed } from '@angular/core/testing';

import { RecipiesService } from './recipies.service';

describe('RecipiesService', () => {
  let service: RecipiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
