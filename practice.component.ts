import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ThemePalette} from '@angular/material/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



export interface DialogData {
  animal: string;
  name: string;
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
export interface PeriodicElement {
  EmpName: string;
  EmployeeKey: number;
  Company: string;
  Designation: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {EmployeeKey: 1, EmpName: 'Abhishek', Company: 'astoria Services', Designation: 'Developer'},
  {EmployeeKey: 2, EmpName: 'Ajay', Company: 'astoria Technologies', Designation: 'Tester'},
  {EmployeeKey: 3, EmpName: 'Jaishree', Company: 'astoria Services', Designation: 'Developer'}
];

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})

export class PracticeComponent implements OnInit {

  displayedColumns: string[] = ['EmployeeKey', 'EmpName', 'Company', 'Designation'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort)sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngOnInit() {
this.dataSource.data = ELEMENT_DATA;
  }
  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  animal!: string;
  name!: string;

constructor(public dialog: MatDialog,private _formBuilder: FormBuilder) {}

openDialog(): void {
    const dialogRef = this.dialog.open(PracticeComponent, {
      width: '250px',
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });

  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


    task: Task = {
      name: 'Indeterminate',
      completed: false,
      color: 'primary',
      subtasks: [
        {name: 'Primary', completed: false, color: 'primary'},
        {name: 'Accent', completed: false, color: 'accent'},
        {name: 'Warn', completed: false, color: 'warn'},
      ],
    };

    allComplete: boolean = false;

    updateAllComplete() {
      this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    }

    someComplete(): boolean {
      if (this.task.subtasks == null) {
        return false;
      }
      return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.task.subtasks == null) {
        return;
      }
      this.task.subtasks.forEach(t => (t.completed = completed));
    }

}


