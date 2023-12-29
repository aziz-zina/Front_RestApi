import { TestBed } from '@angular/core/testing';

import { DataTransportService } from './data-transport.service';

describe('DataTransportService', () => {
  let service: DataTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
