import { Attendance } from './../models/attendance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeattendanceService {

  //private REST_API_SERVER = "https://astoriatrainingazureapi.azurewebsites.net/api";
  private REST_API_SERVER = "http://localhost/abhiAPI/api";
  constructor(private httpClient:HttpClient) { }

  public GetEmployeeAttendance(clockDate:string,companyId:number):Observable<Attendance[]>{
    return this.httpClient.get<Attendance[]>(this.REST_API_SERVER +"/EmployeeAttendances/allattendanceList?FilterClockDate=" +clockDate +"&FilterCompanyID=" + companyId);
  }

  public PostEmployeeAttendance(empattendance:Attendance[]):Observable<boolean>{
   // console.log("UI --> API",empattendance);
    return this.httpClient.post<boolean>(this.REST_API_SERVER +"/EmployeeAttendances/AddAttendance",empattendance);
  }

}
