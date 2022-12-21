import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhysicianService } from 'src/app/physician/services/physician.service';

@Component({
  selector: 'app-phy-capture-details',
  templateUrl: './phy-capture-details.component.html',
  styleUrls: ['./phy-capture-details.component.css'],
})
export class PhyCaptureDetailsComponent implements OnInit {
  options = [];
  listOfOptions = [];
  errors: any = {};
  success: boolean = false;
  vitalForm = this.fb.group({
    vitals: this.fb.group({
      bloodpressure: ['', Validators.required],
      pulse: [''],
      temperature: [''],
      respiration: [''],
      height: [''],
      weight: [''],
    }),
  });
  procedureForm = this.fb.group({
    procedures: this.fb.array([this.fb.control('')]),
  });
  diagnosisForm = this.fb.group({
    diagnosis: this.fb.array([this.fb.control('')]),
  });
  medicationForm = this.fb.group({
    medications: this.fb.array([
      this.fb.group({
        medication: [''],
        dose: [''],
        frequency: [''],
        days: [''],
        notes: [''],
      }),
    ]),
  });
  Ids: any;
  appointmentID: any;
  patientID: any;
  get procedures() {
    return this.procedureForm.get('procedures') as FormArray;
  }
  get diagnosis() {
    return this.diagnosisForm.get('diagnosis') as FormArray;
  }
  get medications() {
    return this.medicationForm.get('medications') as FormArray;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private physicianService: PhysicianService,
    private route: Router
  ) {}

  ngOnInit(): void {
    const { id, id1 } = this.activatedRoute.snapshot.params;
    this.Ids = { patientId: id, appointmentId: id1 };
    this.patientID = id;
    this.appointmentID = id1;
    this.setOptions();
  }
  setOptions() {
    setTimeout(() => {
      this.listOfOptions = this.options;
    }, 2000);
  }
  setcodes(id) {
    let element1 = (<HTMLInputElement>(
      document.getElementById('diagnosis-' + id)
    )).value.length;

    if (element1 != 0) {
      this.physicianService.getDiagnosisCodes().subscribe(
        (res) => {
          console.log(JSON.stringify(res));
          this.listOfOptions = res[0].codes;
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.errors = err;
        }
      );
    } else {
      this.listOfOptions = [];
    }
  }
  setprocodes(id) {
    let element1 = (<HTMLInputElement>(
      document.getElementById('procedure-' + id)
    )).value.length;

    if (element1 != 0) {
      this.physicianService.getProcedureCodes().subscribe(
        (res) => {
          console.log(JSON.stringify(res));
          this.listOfOptions = res[0].codes;
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.errors = err;
        }
      );
    } else {
      this.listOfOptions = [];
    }
  }

  addProcedure() {
    this.listOfOptions = [];
    this.procedures.push(this.fb.control(''));
  }
  addDiagnosis() {
    this.listOfOptions = [];
    this.diagnosis.push(this.fb.control(''));
  }
  addMedication() {
    this.medications.push(
      this.fb.group({
        medication: [''],
        dose: [''],
        frequency: [''],
        days: [''],
        notes: [''],
      })
    );
  }

  onbuttonclick(id: any) {
    this.listOfOptions = [];
    let element1: HTMLElement = document.getElementById(
      'wizard' + id + '-tab'
    ) as HTMLElement;
    if (element1) {
      element1.click();
    }
  }
  resetcodelist() {
    this.listOfOptions = [];
  }

  submitForm() {
    let merged = Object.assign(this.vitalForm.value, this.diagnosisForm.value);
    merged = Object.assign(merged, this.procedureForm.value);
    merged = Object.assign(merged, this.medicationForm.value);
    merged = Object.assign(merged, this.Ids);
    console.log(merged);
    this.physicianService.createOrder(merged).subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.success = true;
        this.updatestatus();
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );
  }
  updatestatus() {
    this.physicianService.updateStatus(this.appointmentID).subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        alert('Appointment Successful');
        this.route.navigate(['/physician/physician-dashboard']);
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.errors = err;
      }
    );
  }
}
