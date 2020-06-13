import { TestBed } from '@angular/core/testing';

import { IconsDataService } from './icons-data.service';

describe('IconsDataService', () => {
  let service: IconsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
