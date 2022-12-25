import { AddDetailsComponent } from './add-details/add-details.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { PracticeComponent } from './practice/practice.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'home',component:HomeComponent },
  { path:'calculator', component: CalculatorComponent },
  { path:'practice',component:PracticeComponent },
  { path:'employee-details',component:EmployeeDetailsComponent },
  { path:'employee-attendance',component:EmployeeAttendanceComponent},
  { path:'dashboard',component:DashboardComponent},
// {path:'adddetails',component:AddDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
