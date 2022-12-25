import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { EmployeeAttendanceComponent } from './employee-attendance.component';

describe('EmployeeAttendanceComponent', () => {
  let component: EmployeeAttendanceComponent;
  let fixture: ComponentFixture<EmployeeAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        HttpClient,
       // { provide: MAT_DIALOG_DATA, useValue: {} },
       // { provide: MatDialogRef, useValue: {} },
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
