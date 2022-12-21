import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-ad-dashboard',
  templateUrl: './ad-dashboard.component.html',
  styleUrls: ['./ad-dashboard.component.css'],
})
export class AdDashboardComponent implements OnInit {
  data: any;
  errors: any;
  userCount: any;
  inactiveUserCount: any;
  physicianCount: any;
  inactiveUsers: any;
  physicians: any;
  patients: any;
  patientCount: any;
  result: any;
  data4: any;
  data5: any;
  exampleArray = []
  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      (res) => {
        this.userCount = res.length;
        this.inactiveUsers = res.filter((item) => item.active == false);
        this.inactiveUserCount = this.inactiveUsers.length;
        this.physicians = res.filter((item) => item.role == 'physician');
        this.physicianCount = this.physicians.length;
        this.patients = res.filter((item) => item.role == 'patient');
        this.patientCount = this.patients.length;
        console.log('Response for all users:', JSON.stringify(res));
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );
    this.adminService.getAllAppointments().subscribe(
      (res) => {
        
        console.log('Response for all users:', JSON.stringify(res));
        this.result = res.reduce((r, { date }) => { 
          var key = date.slice(3, 5);
          let month = getMonthName(key);
          r[month] = (r[month] || 0) + 1;
          return r;
      }, {});
  
  console.log(this.result);
  Object.keys(this.result).forEach(key => {
    
this.exampleArray.push(key)
     
    console.log('key', key);     
    console.log('value', this.result[key]);
    
});  



console.log(this.exampleArray)
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );
    function getMonthName(month){
      const d = new Date();
      d.setMonth(month-1);
      const monthName = d.toLocaleString("default", {month: "long"});
      return monthName;
    }
  }
  
}
