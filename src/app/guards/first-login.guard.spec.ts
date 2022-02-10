import { TestBed } from '@angular/core/testing';

import { FirstLoginGuard } from './first-login.guard';

describe('FirstLoginGuard', () => {
  let guard: FirstLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
