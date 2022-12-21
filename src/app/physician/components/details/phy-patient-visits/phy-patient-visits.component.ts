import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicianService } from 'src/app/physician/services/physician.service';
declare function myTable(): any;

@Component({
  selector: 'app-phy-patient-visits',
  templateUrl: './phy-patient-visits.component.html',
  styleUrls: ['./phy-patient-visits.component.css'],
})
export class PhyPatientVisitsComponent implements OnInit {
  Ids: { patientId: any; appointmentId: any };
  patientID: any;
  appointmentID: any;

  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');
  errors: any;
  appointments: any = {};
  mylastappointments: any = [];
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

  constructor(
    private physicianService: PhysicianService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id, id1 } = this.activatedRoute.snapshot.params;
    this.Ids = { patientId: id, appointmentId: id1 };
    this.patientID = id;
    this.appointmentID = id1;
    this.physicianService
      .getLastVisits(this.userDetail.id, this.patientID)
      .subscribe(
        (res) => {
          console.log(JSON.stringify(res));
          this.mylastappointments = res;
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
  getVitals(appointmentid) {
    this.physicianService
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
