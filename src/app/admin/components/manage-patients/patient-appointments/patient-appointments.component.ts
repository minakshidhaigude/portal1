import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css'],
})
export class PatientAppointmentsComponent implements OnInit {
  appointments: any;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  errors: any = {};
  patientName: any;
  pid: any;
  responseData1: any;
  vitalsResponse: any;
  physicianName: string;
  bloodPressure: any;
  height: any;
  weight: any;
  pulse: any;
  respiration: any;
  diagnosis: any;
  temperature: any;
  procedures: any;
  medicines: any;
  showDialog: boolean;
  edited: boolean = true;
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.pid = id;
    this.adminService.getAppointmentDetails(id).subscribe(
      (res) => {
        console.log('hi' + res);
        this.appointments = res;
        this.patientName = res[0].patientname;
        console.log('Hi1' + this.patientName);
        this.dtTrigger.next();
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 20],
    };
  }
  getVitals(appointment) {
    this.responseData1 = '';
    this.vitalsResponse = '';
    this.adminService.getAppointments(appointment).subscribe((responseList) => {
      console.log(responseList);

      this.responseData1 = responseList[0];
      this.vitalsResponse = responseList[1];
      if (this.vitalsResponse.length == 0) {
        this.edited = false;
      } else {
        this.edited = true;
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
      }
      this.physicianName =
        this.responseData1[0].fname + ' ' + this.responseData1[0].lname;
    });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
