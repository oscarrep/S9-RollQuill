import { TestBed } from '@angular/core/testing';
import { MockNavigateService } from './mocknavigate.service';


describe('MocknavigateService', () => {
  let service: MockNavigateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockNavigateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
