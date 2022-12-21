import { Component, OnInit } from '@angular/core';
import ProfileService from 'src/app/patient/services/profile.service';
declare function myTable(): any;

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css'],
})
export class VisitHistoryComponent implements OnInit {
  appointmentid: any;
  mylastappointments: any = [];
  patientID: any;
  errors: any;
  responseData1: any;
  vitalsResponse: any[] = [];

  responseData2: any;
  physicianName: any;
  ff: string;
  bloodPressure: any;
  height: any;
  weight: any;
  pulse: any;
  respiration: any;
  temperature: any;
  diagnosis: any;
  procedures: any;
  medicines: any;
  vitalData: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    setTimeout(() => {
      myTable();
    }, 100);
    let id = JSON.parse(localStorage.getItem('userDetails1') || '{}').id;

    this.patientID = id;
    console.log(this.patientID);
    //debugger;
    this.profileService.getLastVisits(this.patientID).subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.mylastappointments = res;
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err.error;
      }
    );
    // this.profileService.viewPvitals(this.patientID).subscribe((data) => {
    //   this.vitalData = data;
    //   console.log(this.vitalData);
    // });
  }

  getVitals(appointmentid) {
    this.profileService
      .requestDataFromMultipleSources(appointmentid)
      .subscribe((responseList) => {
        console.log(responseList);

        this.vitalsResponse = responseList;
        this.bloodPressure = this.vitalsResponse[0].vitals.bloodpressure;

        this.height = this.vitalsResponse[0].vitals.height;

        this.weight = this.vitalsResponse[0].vitals.weight;

        this.pulse = this.vitalsResponse[0].vitals.pulse;

        this.respiration = this.vitalsResponse[0].vitals.respiration;

        this.temperature = this.vitalsResponse[0].vitals.temperature;

        this.diagnosis = this.vitalsResponse[0].diagnosis;

        this.procedures = this.vitalsResponse[0].procedures;

        this.medicines = this.vitalsResponse[0].medications;

        console.log(this.vitalsResponse);
      });
  }
}
