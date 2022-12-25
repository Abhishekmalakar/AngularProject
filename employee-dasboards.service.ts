import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDasboardsService {

  private REST_API_SERVER = "https://astoriatrainingazureapi.azurewebsites.net/api";

  constructor(private httpClient:HttpClient) { }

  public GetEmployeeDashboard(){
    return this.httpClient.get(this.REST_API_SERVER+ "/Dashboard/EmployeeCount");
  }

  public GetEmployeeWorkinigHours(){
    return this.httpClient.get(this.REST_API_SERVER+ "/Dashboard/EmployeeWorkingHours");
  }

  public GetEmployeeTotalSalary(){
    return this.httpClient.get(this.REST_API_SERVER+ "/Dashboard/EmployeeTotalSalary");
  }
}
