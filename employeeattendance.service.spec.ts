import { TestBed } from '@angular/core/testing';

import { EmployeeattendanceService } from './employeeattendance.service';

describe('EmployeeattendanceService', () => {
  let service: EmployeeattendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeattendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
