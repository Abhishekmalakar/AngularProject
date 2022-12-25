import { EmployeeMaster } from './../models/EmployeeMaster';
import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { Employee } from './../models/employee';
import { CompanyMaster } from './../models/company-master';
import { Component, Inject, OnInit } from '@angular/core';
import { EmployeedetailsService } from './../services/employeedetails.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DesignationMaster } from '../models/designation-master';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css'],
})
export class AddDetailsComponent implements OnInit {
  form!: FormGroup;

  public dataSource = new MatTableDataSource<CompanyMaster>();
  public dataSource1 = new MatTableDataSource<DesignationMaster>();
  companies!: CompanyMaster[];
  designationname!: DesignationMaster[];
  genders!: ['Male', 'Female'];

  emp: Employee = new Employee();
  empFormGroup: FormGroup = new FormGroup({
    empId: new FormControl('', [Validators.required, Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9-]*')]),
    comname: new FormControl('',[ Validators.required]),
    empFirstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),Validators.pattern('[a-zA-Z]*')
    ]),
    empLastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),Validators.pattern('[a-zA-Z]*')
    ]),
    designationname: new FormControl('', [Validators.required]),
    sallaryRate: new FormControl('', [
      Validators.required,
      Validators.max(1000),Validators.pattern('[0-9]*'),
    ]),
    joinDate: new FormControl('', [Validators.required]),
    resignationdate: new FormControl(),
    empgender: new FormControl('', [Validators.required]),
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.empFormGroup.controls[controlName].hasError(errorName);
  };
  IsEmployeeIDExists: boolean = false;
  IsidinUse: boolean=false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private employeedetailsService: EmployeedetailsService
  ) {
    this.employeekey = data;
  }
  title: string = '';
  employeekey: number = 0;
  showUpdatebutton: boolean = true;
  showSavebutton: boolean = true;
  disableResignationDate: boolean = true;

  ngOnInit() {
    this.employeekey = this.data as number;
    if (this.employeekey == 0) {
      this.title = 'Add Employee';
      this.showUpdatebutton = false;
      this.disableResignationDate = true;
      this.showSavebutton = true;
    } else {
      // console.log(this.employeekey);
      this.GetEmployeeByID(this.employeekey);
      this.title = 'Edit Details';
      this.showUpdatebutton = true;
      this.showSavebutton = false;
      this.disableResignationDate = false;
    }

    this.GetallCompanyMaster();
    this.GetallDesignationMaster();
    // this.postEmployee();
  }

  SaveEmployeeDetails(): void {
    // console.log(this.emp);
    this.empFormGroup.markAllAsTouched();
  //  this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours()+5);
    //this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes()+30);
    this.employeedetailsService
      .GetEmployeeIdExists(this.emp.employeeId, this.data)
      .subscribe((data) => {
        this.IsEmployeeIDExists = data as boolean;
        if (this.IsEmployeeIDExists == false) {
          this.employeedetailsService
            .postEmployee(this.emp)
            .subscribe((data) => {
             // console.log(data);
              Swal.fire({
                title: 'Success',
                text: 'You Have Created Employee Details Successfull',
                icon: 'success',
                confirmButtonText: 'Success',
              });
              this.dialogRef.close();
            });
        } else {
          Swal.fire({
            title: 'Alert',
            text: 'EmployeeID Alredy Exists',
            icon: 'warning',
          });
        }
      });
  }

  UpdateEmployeeDetails() {
    //console.log(this.emp);
    this.empFormGroup.markAllAsTouched();
    if(this.emp.empJoiningDate!=this.emp.empJoiningDate){
    this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours()+5);
    this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes()+30);
  }

  if(this.emp.empResignationDate!=this.emp.empResignationDate){
    this.emp.empResignationDate.setHours(this.emp.empResignationDate.getHours()+5);
    this.emp.empResignationDate.setMinutes(this.emp.empResignationDate.getMinutes()+30);
  }
    if(this.emp.empJoiningDate != null && this.emp.empResignationDate != null){
     if(new Date(this.emp.empJoiningDate) > new Date(this.emp.empResignationDate)) {
        Swal.fire({
          title: 'alert',
          text: 'Resignation Date should be greater than Joining Date',
          icon: 'warning',
          confirmButtonColor: 'alert',
         });
         return;
      }
    }
    this.employeedetailsService
      .GetEmployeeIdExists(this.emp.employeeId, this.emp.employeeKey)
      .subscribe((data) => {
        this.IsEmployeeIDExists = data as boolean;
        if (!this.IsEmployeeIDExists) {
          this.employeedetailsService
            .putEmployee(this.emp, this.employeekey)
            .subscribe((data) => {

           //  console.log("data");
            })
        }else {
          Swal.fire({
            title: 'alert',
            text: 'already Exists',
            icon: 'warning',
            confirmButtonColor: 'alert',

          });
        }
      });
    this.dialogRef.close();

    Swal.fire({
      title: 'success',
      text: 'Successful Updated',
      icon: 'success',
    });
  }

close() {
    this.dialogRef.close();
  }

  public GetallCompanyMaster = () => {
    this.employeedetailsService.GetallCompanyMaster().subscribe((data) => {
      // console.log(data)
      this.companies = data as CompanyMaster[];
      // console.log(this.companies);
    });
  };

  public GetEmployeeByID(empKey: number) {
    this.employeedetailsService.GetEmployeeByID(empKey).subscribe((data) => {
      //console.log(data as Employee);
      this.emp = data as Employee;
      //console.log(data);
    });
  }

  public GetallDesignationMaster = () => {
    this.employeedetailsService.GetallDesignationMaster().subscribe((data) => {
      console.log('designations', data);
      this.designationname = data as DesignationMaster[];
     // console.log(this.designationname);
    });
  };
}

