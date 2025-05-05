import { TestBed } from '@angular/core/testing';

import { HpService } from './hp.service';

describe('HpService', () => {
  let service: HpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
