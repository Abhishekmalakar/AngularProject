import { EmployeeMaster } from './../models/EmployeeMaster';
import { Attendance } from './../models/attendance';
import { EmployeedetailsService } from './../services/employeedetails.service';
import * as moment from 'moment';
import { EmployeeattendanceService } from './../services/employeeattendance.service';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CompanyMaster } from '../models/company-master';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe, Time } from '@angular/common';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
})
export class EmployeeAttendanceComponent implements OnInit {
  //showloadBtn: boolean = true;
  showTable: boolean = false;
  attendance!: Attendance[];
  empCompanyID!: number;
  clockDate!: string;
  filterDate!: Date;
  NgxMaterialTimepickerModule!: Time;
  comID!: number;
  employeeID!:any;
  validemployee='';
  invalid='';


  emp: Attendance = new Attendance();
  companies!: CompanyMaster[];

  form!: FormGroup;

  public hasError = (controlName: string, errorName: string) => {
    return this.empFormGroup.controls[controlName].hasError(errorName);
  };
  public displayedColumns = [
    'employeeID',
    'employeeName',
    'clockDate',
    'timeIn',
    'timeOut',
    'remarks',
  ];

  public dataSource = new MatTableDataSource<Attendance>();
  EmpAtt: Attendance[] = [];
  maxDate!: any;
  time!: any;
  attendancelist!: Attendance[];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  data: any;
  disableSaveButton: boolean = false;
  constructor(
    public employeeattendanceService: EmployeeattendanceService,
    public employeedetailsService: EmployeedetailsService
  ) {}

  ngOnInit() {
    this.GetallCompanyMaster();
    this.maxDate = new Date();
    this.disableSaveButton = true;

    this.empFormGroup = new FormGroup({
      comname: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }
  empFormGroup!: FormGroup;

  public LoadEmployeeAttendance = () => {
    // console.log(this.comID);
   // this.empFormGroup.markAllAsTouched();

    if (this.empFormGroup.valid) {
      this.showTable = true;
      //   console.log(this.filterDate,this.emp.empCompanyID)
      this.employeeattendanceService
        .GetEmployeeAttendance(this.filterDate.toDateString(), this.comID)
        .subscribe((data) => {
          //console.log(data);
          this.attendancelist = data as Attendance[];
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.data = this.attendancelist;
          console.log(this.dataSource.data,"data")
          this.dataSource.paginator = this.paginator;
          if (this.attendancelist.length > 0) {
            this.disableSaveButton = false;
          }
        });
    } else {
      Swal.fire('Date / Company fields required');
    }
  };
  actualData!: any[];

 public GetallCompanyMaster = () => {
    this.employeedetailsService.GetallCompanyMaster().subscribe((data) => {
      // console.log(data)
      this.companies = data as CompanyMaster[];
      // console.log(this.companies);
    });
  };

public SaveEmployeeAttendance(): void {
 let invalid_data = new Array<string>();
 let invalid_time = new Array<string>();
 this.actualData = this.dataSource.data;
 let listAttendance = new Array<Attendance>();

 this.actualData.forEach((data, index) => {
 var datepipe = new DatePipe('en-US');
 datepipe.transform(data.clockDate, 'yyyy-MM-dd');
if (
       (data.timeIn == '' && data.timeOut != '' && data.remarks == '') ||
       (data.timeIn != '' && data.timeOut == '' && data.remarks == '') ||
       (data.timeIn == '' && data.timeOut != '' && data.remarks != '') ||
       (data.timeIn != '' && data.timeOut == '' && data.remarks != '') ||
       (data.timeIn == '' && data.timeOut == '' && data.remarks != '') ||
       (data.timeIn != '' && data.timeOut != '' && data.remarks == '')
   )
   {
      this.employeeID=data.employeeID;
       invalid_data.push(this.employeeID);
    }
      else{
            if (data.timeIn != '' && data.timeOut != '' && data.remarks != ''){
                let attendance = new Attendance();
                 attendance.employeeKey = data.employeeKey;
                 attendance.timeIn = data.clockDate + 'T' +data.timeIn +':00';
                 attendance.timeOut = data.clockDate + 'T' +data.timeOut +':00';
                 //data.timeIn = data.clockDate + 'T' + data.timeOut + ':00';
                 attendance.clockDate = data.clockDate;
                 attendance.remarks = data.remarks;
                 listAttendance.push(attendance);

                 if (data.timeIn > data.timeOut) {
                     this.invalid=data.emploeeID;
                     //  this.invalid = this.invalid+ data.employeeName
                     this.employeeID = data.employeeID;
                      invalid_time.push(this.invalid);
                      invalid_time.push(this.employeeID);
                 }
               }
            }
          });

   if(invalid_data.length>0){
          Swal.fire("All Filds are required for:" +invalid_data )
        }

    if(invalid_time.length>0){
               Swal.fire("Time out should be greater than timeIn:" +invalid_time )
    }

    if(invalid_data.length>0 && invalid_time.length>0 ){
           Swal.fire("All Fields are required for:" +invalid_data  +".Time out should be greater than timeIn:" +invalid_time)

    }


    if(this.actualData!=null && invalid_data.length==0 && invalid_time.length==0){
       this.employeeattendanceService
         .PostEmployeeAttendance(listAttendance)
         .subscribe((data)=>{
          Swal.fire("Attendance Saved Successfully ")
 });
    }
 }
doFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
