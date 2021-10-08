import { TestBed } from '@angular/core/testing';

import { SlideOverService } from './slide-over.service';

describe('SlideOverService', () => {
  let service: SlideOverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideOverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
