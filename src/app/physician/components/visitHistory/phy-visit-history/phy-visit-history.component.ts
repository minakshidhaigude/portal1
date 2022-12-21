import { Component, OnInit } from '@angular/core';
import { PhysicianService } from 'src/app/physician/services/physician.service';
declare function myTable(): any;

@Component({
  selector: 'app-phy-visit-history',
  templateUrl: './phy-visit-history.component.html',
  styleUrls: ['./phy-visit-history.component.css'],
})
export class PhyVisitHistoryComponent implements OnInit {
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');
  errors: any;
  appointments: any = {};
  myappointments: any = [];

  constructor(private physicianService: PhysicianService) {}

  ngOnInit(): void {
    this.physicianService.getMyvisits(this.userDetail.id).subscribe(
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
}
