import { TestBed } from '@angular/core/testing';

import { RegDonacionService } from './reg-donacion.service';

describe('RegDonacionService', () => {
  let service: RegDonacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegDonacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
