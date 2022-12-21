import { Component, OnInit } from '@angular/core';
import { PhysicianService } from 'src/app/physician/services/physician.service';
import { Register } from 'src/app/shared-component/model/register';
declare function myTable(): any;

@Component({
  selector: 'app-py-dashboard',
  templateUrl: './py-dashboard.component.html',
  styleUrls: ['./py-dashboard.component.css'],
})
export class PyDashboardComponent implements OnInit {
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');
  errors: any;
  appointments: any = {};
  myappointments: any = [];
  constructor(private physicianService: PhysicianService) {}

  ngOnInit(): void {
    this.physicianService.getMyappointments(this.userDetail.id).subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.myappointments = res;
        setTimeout(() => {
          myTable();
        }, 100);
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err.error;
      }
    );
  }
  // refresh() {
  //   myTable();
  // }
}
