import { TestBed } from '@angular/core/testing';

import { EmployeeDasboardsService } from './employee-dasboards.service';

describe('EmployeeDasboardsService', () => {
  let service: EmployeeDasboardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDasboardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
