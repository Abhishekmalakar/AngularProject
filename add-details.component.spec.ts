import { Employee } from './../models/employee';
import { CompanyMaster } from './../models/company-master';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';

import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormBuilder, FormGroup } from '@angular/forms';
import { AddDetailsComponent } from './add-details.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';

fdescribe('AddDetailsComponent', () => {
  let component: AddDetailsComponent;
  let fixture: ComponentFixture<AddDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        HttpClient,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form must be invalid because all the fields are empty', () => {
    expect(component.empFormGroup.valid).toBeFalse();
  });

  it('Check valid form data', () => {
    component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue(1005);
    component.empFormGroup.controls['sallaryRate'].setValue(101.0);
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeTruthy();
  });

  it('Check Invalid form data',()=>{
    component.empFormGroup.controls['empId'].setValue("ATIL_104");
    component.empFormGroup.controls['comname'].setValue('102');
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue('1005');
    component.empFormGroup.controls['sallaryRate'].setValue(101.0);
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
  });

  it('Check Invalid EmployeeId length',()=>{
    component.empFormGroup.controls['empId'].setValue("ATIL10444444444444444444");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue(1005);
    component.empFormGroup.controls['sallaryRate'].setValue(101.0);
    component.empFormGroup.controls['joinDate'].setValue(new Date('2022-09-29'));
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
  });

  it('Check Invalid EmployeeFirstNameValidation',()=>{
    component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine123');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue(1005);
    component.empFormGroup.controls['sallaryRate'].setValue(101.0);
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
  });

  it('Check Invalid EmpFirstNameEmpty',()=>{
    component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue(1005);
    component.empFormGroup.controls['sallaryRate'].setValue(101.0);
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
});

it("Check Invalid EmpLastNameEmpty",()=>{
  component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('');
    component.empFormGroup.controls['designationname'].setValue(1005);
    component.empFormGroup.controls['sallaryRate'].setValue(101.0);
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
});

it("Check Invalid EmployeeDesignationEmpty",()=>{
  component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue('');
    component.empFormGroup.controls['sallaryRate'].setValue(101.0);
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
});

it("Check Invalid EmployeeSalaryEmpty",()=>{
  component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue('1005');
    component.empFormGroup.controls['sallaryRate'].setValue('');
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
});

it("Check Invalid EmployeeJoiningDateEmpty",()=>{
  component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue('1005');
    component.empFormGroup.controls['sallaryRate'].setValue('101.0');
    component.empFormGroup.controls['joinDate'].setValue('');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.valid).toBeFalsy();
});

it("Check Invalid EmployeeGenderEmpty",()=>{
  component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue('1005');
    component.empFormGroup.controls['sallaryRate'].setValue('101.0');
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('');
    expect(component.empFormGroup.valid).toBeFalsy();
});

it("Check Invalid EmployeeSalary_IfCharacter",()=>{
  component.empFormGroup.controls['empId'].setValue("ATIL104");
    component.empFormGroup.controls['comname'].setValue(102);
    component.empFormGroup.controls['empFirstName'].setValue('Sachine');
    component.empFormGroup.controls['empLastName'].setValue('Rangote');
    component.empFormGroup.controls['designationname'].setValue('1005');
    component.empFormGroup.controls['sallaryRate'].setValue('ajsjd');
    component.empFormGroup.controls['joinDate'].setValue('2022-09-29');
    component.empFormGroup.controls['resignationdate'].setValue('');
    component.empFormGroup.controls['empgender'].setValue('M');
    expect(component.empFormGroup.invalid).toBeTruthy();
});

it("CheckData BindinginCompany",()=>{
  //component.GetallCompanyMaster;
  expect(component.GetallCompanyMaster).toBeTruthy();
});

it("Check Data BindedinDesignation",()=>{
  //component.GetallDesignationMaster.bind;
expect(component.GetallDesignationMaster).toBeTruthy();
});




});

