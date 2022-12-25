import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from './employee-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { RouterTestingModule } from '@angular/router/testing';
fdescribe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
     imports: [HttpClientTestingModule,MatDialogModule,MatTableModule,BrowserAnimationsModule],

      providers: [
        HttpClient,FormBuilder,FormsModule,AppComponent,RouterTestingModule

      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should Check All data Binded",()=>{
   var s=component.dataSource.data;
   expect(s).toBeTruthy();
  });

  it("Check AddDialogOpen",()=>{
   component.openAddDialog(1);
   expect(component.openAddDialog).toBeTruthy();
 });

 it("Check EditeDialogOpen",()=>{
  component.openAddDialog(10028);
  expect(component.openAddDialog).toBeTruthy();
});


 it("Check EmployeeDeletion",() => {
   component.deleteEmployee(10028);
   expect(component.deleteEmployee).toBeTruthy();
});

it("Check the position of EmployeeId Column",()=>{
  expect(component.displayedColumns[0]).toContain("employeeID");
});

it("Check the position of Employee Name Column",()=>{
  expect(component.displayedColumns[1]).toContain("employeeName");
});

it("Check the position of EmployeeCompany Column",()=>{
  expect(component.displayedColumns[2]).toContain("company");
});

it("Check the position of Employee Column",()=>{
  expect(component.displayedColumns[3]).toContain("designation");
  });

  it("Check the position of JoiningDate Column",()=>{
  expect(component.displayedColumns[4]).toContain("joiningDate");
  });

  it("Check the position of Gender Column",()=>{
  expect(component.displayedColumns[5]).toContain("gender");
});

it("Check TotalRecordCount",() =>{;
  const length=component.dataSource.data.length;
expect(length).toBeGreaterThanOrEqual(0);
});

});
