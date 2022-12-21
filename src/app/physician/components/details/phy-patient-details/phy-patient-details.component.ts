import { Component, OnInit, ViewChild } from '@angular/core';
// import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicianService } from 'src/app/physician/services/physician.service';

@Component({
  selector: 'app-phy-patient-details',
  templateUrl: './phy-patient-details.component.html',
  styleUrls: ['./phy-patient-details.component.css'],
})
export class PhyPatientDetailsComponent implements OnInit {
  errors: any = {};
  success: boolean = false;

  Ids: any;
  appointmentID: any;
  patientID: any;
  data: any[] = [];
  vitalsResponse: any[] = [];
  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject();

  updatePatientForm: FormGroup;
  id: any;
  data1: any;
  data2: string;
  key: string;
  appointments: any;
  responseData1: any;
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
  pid: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private physicianService: PhysicianService,
    private route: Router
  ) {
    this.updatePatientForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      pdob: new FormControl('', [
        Validators.required,
        Validators.pattern('^.+@.+..+$'),
      ]),
      pgender: new FormControl('', [Validators.required]),
      pethnicity: new FormControl('', [Validators.required]),
      poccupation: new FormControl('', [Validators.required]),
      paddress: new FormControl('', [Validators.required]),
      pmobileno: new FormControl('', [Validators.required]),
      fmedicalhistory: new FormControl('', [Validators.required]),

      pmedicalhistory: new FormControl('', [Validators.required]),

      psurgeries: new FormControl('', [Validators.required]),
      pprovider: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const { id, id1 } = this.activatedRoute.snapshot.params;
    this.Ids = { patientId: id, appointmentId: id1 };
    this.patientID = id;
    this.appointmentID = id1;
    this.physicianService.getPatient(id).subscribe(
      (res) => {
        console.log(res);
        this.pid = res.id;
        this.data1 = res.demographics;
        this.updatePatientForm.controls['fname'].setValue(
          res.demographics.fname
        );
        this.updatePatientForm.controls['lname'].setValue(
          res.demographics.lname
        );
        console.log('hi' + res.demographics.pdob);
        this.updatePatientForm.controls['pdob'].setValue(
          this.formatDate(res.demographics.pdob)
        );
        this.updatePatientForm.controls['pgender'].setValue(
          res.demographics.pgender
        );
        this.updatePatientForm.controls['pethnicity'].setValue(
          res.demographics.pethnicity
        );

        this.updatePatientForm.controls['poccupation'].setValue(
          res.demographics.poccupation
        );
        this.updatePatientForm.controls['paddress'].setValue(
          res.demographics.paddress
        );
        this.updatePatientForm.controls['pmobileno'].setValue(
          res.demographics.pmobileno
        );
        this.updatePatientForm.controls['fmedicalhistory'].setValue(
          res.demographics.fmedicalhistory
        );
        this.updatePatientForm.controls['pmedicalhistory'].setValue(
          res.demographics.pmedicalhistory
        );
        this.updatePatientForm.controls['psurgeries'].setValue(
          res.demographics.psurgeries
        );
        this.updatePatientForm.controls['pprovider'].setValue(
          res.demographics.pprovider
        );
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );
    // this.physicianService.getAppointmentDetails(id1).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.appointments = res;
    //     this.dtTrigger.next();
    //   },
    //   (err) => {
    //     console.log(JSON.stringify(err));
    //     this.errors = err;
    //   }
    // );

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    //   lengthMenu: [5, 10, 20],
    // };
  }
  updatePatientDemographics() {
    const { id } = this.activatedRoute.snapshot.params;
    console.log(id);
    this.data1 = this.updatePatientForm.value;
    console.log(this.data1);
    this.data2 = JSON.stringify(this.data1);
    if (this.data1.fname) {
      this.key = 'demographics';
    }
    this.physicianService.updatePatientDemographics(this.data1, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );
  }

  // getVitals(appointment) {
  //   this.physicianService
  //     .requestDataFromMultipleSources(appointment)
  //     .subscribe((responseList) => {
  //       console.log(responseList);
  //       this.responseData1 = responseList[0];
  //       this.vitalsResponse = responseList[1];
  //       this.physicianName =
  //         this.responseData1[0].fname + ' ' + this.responseData1[0].lname;
  //       this.bloodPressure = this.vitalsResponse[0].vitals.bloodpressure;
  //       this.height = this.vitalsResponse[0].vitals.height;
  //       this.weight = this.vitalsResponse[0].vitals.weight;
  //       this.pulse = this.vitalsResponse[0].vitals.pulse;
  //       this.respiration = this.vitalsResponse[0].vitals.respiration;
  //       this.temperature = this.vitalsResponse[0].vitals.temperature;
  //       this.diagnosis = this.vitalsResponse[0].diagnosis;
  //       this.procedures = this.vitalsResponse[0].procedures;
  //       this.medicines = this.vitalsResponse[0].medications;
  //       console.log(this.vitalsResponse);
  //     });
  // }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
