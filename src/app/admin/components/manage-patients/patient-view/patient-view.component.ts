import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css'],
})
export class PatientViewComponent implements OnInit {
  data: any[] = [];
  vitalsResponse: any[] = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  errors: any = {};

  updatePatientForm: FormGroup;
  patientImmunizationForm: FormGroup;
  patientMedicationForm: FormGroup;
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
  immunization: any;
  otcDrug: any;
  otcDrugStrength: any;
  otcDrugConsume: any;
  vaccineName: any;
  currentDrugConsume: any;
  currentDrugStrength: any;
  pastDrugConsume: any;
  pastDrugStrength: any;
  currentDrug: any;
  pastDrug: any;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.updatePatientForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      pdob: new FormControl('', [Validators.required]),
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
    this.patientImmunizationForm = new FormGroup({
      firstDoseDate: new FormControl(),
      secondDoseDate: new FormControl(),
      generalVaccines: new FormControl(),
    });
    this.patientMedicationForm = new FormGroup({
      drugReaction: new FormControl(),
      socialDrugs: new FormControl(),
      herbAllergies: new FormControl(),
      drugAllergies: new FormControl(),
      otherAllergies: new FormControl(),
    });
  }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    this.adminService.getPatient(id).subscribe(
      (res) => {
        this.pid = res.id;
        this.data1 = res.demographics;
        console.log('Hi' + res.medication.allergies);

        this.updatePatientForm.controls['fname'].setValue(
          res.demographics.fname
        );

        this.updatePatientForm.controls['lname'].setValue(
          res.demographics.lname
        );

        this.updatePatientForm.controls['pdob'].setValue(res.demographics.pdob);

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
        this.patientImmunizationForm.controls['firstDoseDate'].setValue(
          this.formatDate(res.immunization.firstDoseDate)
        );
        this.patientImmunizationForm.controls['secondDoseDate'].setValue(
          this.formatDate(res.immunization.secondDoseDate)
        );
        this.patientImmunizationForm.controls['generalVaccines'].setValue(
          res.immunization.generalVaccines
        );
        this.patientMedicationForm.controls['socialDrugs'].setValue(
          res.medication.socialdrugs
        );
        this.patientMedicationForm.controls['drugAllergies'].setValue(
          res.medication.drugallergies
        );
        this.patientMedicationForm.controls['herbAllergies'].setValue(
          res.medication.herbsdetails
        );
        this.patientMedicationForm.controls['otherAllergies'].setValue(
          res.medication.allergies
        );
        this.otcDrug = res.medication.otcdrugs.odrugname;
        this.otcDrugStrength = res.medication.otcdrugs.ostrength;
        this.otcDrugConsume = res.medication.otcdrugs.oconsume;
        this.vaccineName = res.immunization.vaccineName;
        this.currentDrug = res.medication.Prescribeddrugs.pdrugname;
        this.currentDrugStrength = res.medication.Prescribeddrugs.pstrength;
        this.currentDrugConsume = res.medication.Prescribeddrugs.pconsume;
        this.pastDrug = res.medication.Pastmedication.pmdrugname;
        this.pastDrugStrength = res.medication.Pastmedication.pmstrength;
        this.pastDrugConsume = res.medication.Pastmedication.pmconsume;
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
  updatePatientDemographics() {
    const { id } = this.activatedRoute.snapshot.params;
    console.log(id);
    this.data1 = this.updatePatientForm.value;
    console.log('hhh' + this.data1);
    this.data2 = JSON.stringify(this.data1);

    this.adminService.updatePatientDemographics(this.data1, id).subscribe(
      (res) => {
        this.toastr.success("Patient Details Updated")
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );
  }
  updatePatientImmunization() {
    const { id } = this.activatedRoute.snapshot.params;

    this.immunization = this.patientImmunizationForm.value;
    this.adminService
      .updatePatientImmunization(this.immunization, id)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.errors = err;
        }
      );
  }
  updatePatientMedication() {}

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
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
