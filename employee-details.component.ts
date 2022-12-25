import { AddDetailsComponent } from './../add-details/add-details.component';
import { Employee } from './../models/employee';
import { EmployeedetailsService } from './../services/employeedetails.service';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  public displayedColumns = [
    'employeeID',
    'employeeName',
    'company',
    'designation',
    'joiningDate',
    'gender',
    'edit',
    'delete',
  ];
  public dataSource = new MatTableDataSource<Employee>();
  employees!: Employee[];
  emp: Employee = new Employee();

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  MatdialogRef: any;
  IsidinUse: boolean = false;
  buttons: boolean = true;

  constructor(
    public employeedetailsService: EmployeedetailsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getallEmployeeList();
    //this.dataSource.sort = this.sort;
  }

  public openAddDialog(empKey: number) {
    const MatdialogConfig = new MatDialogConfig();
    let dialogConfig = {
      width: '700px',
      height: '600px',
      data: empKey,
    };
    let dialogRef = this.dialog.open(AddDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getallEmployeeList();
    });
  }
  public getallEmployeeList = () => {
    this.employeedetailsService.GetallEmployeeList().subscribe((data) => {
      this.employees = data;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  deleteEmployee(empKey: number) {
    this.employeedetailsService.EmployeeIdinUse(empKey).subscribe((data) => {
      this.IsidinUse = data as boolean;
      if (this.IsidinUse) {
        // this.employeedetailsService.deleteEmployee(empKey).subscribe((data)=>{
        //   this.getallEmployeeList();
        // })
        Swal.fire({
          title: 'alert',
          text: 'already In Use',
          icon: 'warning',
          confirmButtonText: 'alert',
        });
      } else {
        Swal.fire({
          title: 'Are You Suer You want to delete',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.employeedetailsService
              .deleteEmployee(empKey)
              .subscribe((data) => {
                this.getallEmployeeList();
                Swal.fire({
                  title: 'Success',
                  text: 'You Have deleted Successfull',
                  icon: 'success',
                  confirmButtonText: 'Success',
                });
              });
          }
        });
      }
    });
    // this.dialog.closeAll();

    // Swal.fire({
    //           title: 'Success',
    //           text: 'You Have deleted Successfull',
    //           icon: 'success',
    //           //confirmButtonText: 'Success',

    //          });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
