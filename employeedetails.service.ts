import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';



@Injectable({
  providedIn: 'root'
})
export class EmployeedetailsService {


  //private REST_API_SERVER = "https://astoriatrainingazureapi.azurewebsites.net/api";
  private REST_API_SERVER = "http://localhost/abhiAPI/api";
  constructor(private httpClient:HttpClient) { }
  public GetEmployeeMaster(){
    return this.httpClient.get(this.REST_API_SERVER +"/EmployeeMasters");
  }

  public GetallEmployeeList(){
    return this.httpClient.get<Employee[]>(this.REST_API_SERVER +"/EmployeeMasters/allEmployeeList");
  }

  public GetallCompanyMaster(){
    return this.httpClient.get(this.REST_API_SERVER +"/EmployeeMasters/allCompanies");
  }

  public GetallDesignationMaster(){
    return this.httpClient.get(this.REST_API_SERVER +"/EmployeeMasters/allDesignation");
  }


  public GetEmployeeByID(empKey:number) : Observable<Employee>{
    return this.httpClient.get<Employee>(this.REST_API_SERVER +"/EmployeeMasters/" +empKey);
  }

  public postEmployee(employee : Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(this.REST_API_SERVER +"/EmployeeMasters",employee);
   }


 public deleteEmployee(empKey : number){
    return this.httpClient.delete(this.REST_API_SERVER +"/EmployeeMasters/"+empKey);
   }

   public putEmployee(employee: Employee,empKey:number): Observable<Employee> {
    return this.httpClient.put<Employee>(this.REST_API_SERVER +"/EmployeeMasters/"+ empKey, employee);
}

public GetEmployeeIdExists(employeeId:string, employeeKey:number ){
  return this.httpClient.get<boolean>(this.REST_API_SERVER +"/EmployeeMasters/EmployeeIDExists?EmployeeID="+ employeeId +"&employeeKey="+employeeKey)
}

public EmployeeIdinUse(employeeKey:number){
  return this.httpClient.get<boolean>(this.REST_API_SERVER +"/EmployeeMasters/EmployeeIdinUse?employeeKey="+employeeKey)
}
}
