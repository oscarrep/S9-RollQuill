import { TestBed } from '@angular/core/testing';

import { DndJsonService } from './dnd-json.service';

describe('DndJsonService', () => {
  let service: DndJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DndJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
