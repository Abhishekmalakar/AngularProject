import { Dashboard } from './../models/dashboard';
import { EmployeeDasboardsService } from './../services/employee-dasboards.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType, TimeScale } from 'chart.js';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  constructor(public employeeDasboardsService: EmployeeDasboardsService) {}

  public pieChartOptions: ChartOptions = {
    responsive: true,



  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  //public pieChartLabels: any;

  pichartdata: number[] = [];
  pieData: any[] = [];
  pieChartLabels: string[] = ['Active employee', 'Resigned Employee'];
  barlenghtHours: any[] = [];
  hours: any[] = [];
  workingHours: any[] = [];
  barlenghtdates: any[] = [];
  length: any[] = [];
  ClockDate: any[] = [];
  barchartdata: any[] = [];
  Barchart: any[] = [];

  barHourlySalary:any[]=[];
  salarybarchart:any[]=[];
  //barChartLabels:string[]= ['WorkingHours'];

  ngOnInit() {
    this.piechart();
    this.BarChart();
    this.Salarybarchart();

  }

  barChartDate: any =[];

  BarChart() {
    this.employeeDasboardsService
      .GetEmployeeWorkinigHours()
      .subscribe((data) => {
        this.barChartDate = data;
        this.barChartDate.forEach((e: { date: any; totalWorkingHours: any; }) =>{
          this.barlenghtdates.push(e.date);
          this.barlenghtHours.push(e.totalWorkingHours)
        })
        let barchartId = new Chart('barchartId', {
          type: 'bar',
          data: {
            labels: this.barlenghtdates,

            datasets: [
              {
                data: this.barlenghtHours,
                label: 'working Hours',
                backgroundColor: ['gold'],
                borderColor: 'rgba(77,20,54,4)',
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      });
  }
  Salarybarchart(){
    this.employeeDasboardsService.GetEmployeeTotalSalary().subscribe((data)=>{
      this.barChartDate=data;
      this.barChartDate.forEach((e:{date:any; totalSalary:any;})=>{
        this.barlenghtdates.push(e.date);
        this.barHourlySalary.push(e.totalSalary)
      })
      let TotalSalaryBarChartId = new Chart('TotalSalaryBarChartId', {
        type: 'bar',
        data: {
          labels: this.barlenghtdates,
          datasets: [
            {
              data: this.barHourlySalary,
              label: 'TotalSalary',
              backgroundColor: ['green'],
              borderColor: 'rgba(77,20,96,1)',
            },
          ],
        },

      });
    });
}




  piechart(): void {
    var pichartcolor=['green','yellow']
    //console.log('PieChart Method Entered');
    this.employeeDasboardsService.GetEmployeeDashboard().subscribe((data) => {
      this.pichartdata = data as number[];
      this.pieData = this.pichartdata;

      let pichartId = new Chart('pichartId', {
        type: 'pie',
        data: {
          labels: this.pieChartLabels,

          datasets: [
            {
              data: this.pieData,
              backgroundColor: pichartcolor,
              borderColor: 'yellow',
            },
          ],
        },
      });
    });
  }


}
