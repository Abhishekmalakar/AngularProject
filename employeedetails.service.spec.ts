import { TestBed } from '@angular/core/testing';

import { EmployeedetailsService } from './employeedetails.service';

describe('EmployeedetailsService', () => {
  let service: EmployeedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeedetailsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
