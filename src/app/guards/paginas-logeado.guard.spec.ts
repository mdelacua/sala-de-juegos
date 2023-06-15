import { TestBed } from '@angular/core/testing';

import { PaginasLogeadoGuard } from './paginas-logeado.guard';

describe('PaginasLogeadoGuard', () => {
  let guard: PaginasLogeadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaginasLogeadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
