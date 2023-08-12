import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedInGuard, notLoggedInGuard } from './auth-guard.guard';

describe('authGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
