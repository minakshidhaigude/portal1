import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PatientService } from 'src/app/patient/services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css'],
})
export class PatientProfileComponent implements OnInit {
  errors: any = {};
  demographicsForm: FormGroup;
  userDetail: any = JSON.parse(localStorage.getItem('userDetails1') || '{}');
  medicationallergiesForm: FormGroup;
  immunizationForm: FormGroup;
  activatedRoute: any;
  patientid: any;
  success: boolean = false;

  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder
  ) {
    this.demographicsForm = this.formBuilder.group({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      ethnicity: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      medicalData: new FormControl('', [Validators.required]),
      familymedicalData: new FormControl('', [Validators.required]),
      surgeries: new FormControl('', [Validators.required]),
      provider: new FormControl('', [Validators.required]),
    });

    this.medicationallergiesForm = this.formBuilder.group({
      drugreaction: new FormControl('', [Validators.required]),
      socialdrugs: new FormControl('', [Validators.required]),
      herbsdetails: new FormControl('', [Validators.required]),
      drugallergies: new FormControl('', [Validators.required]),

      Prescribeddrugs: new FormGroup({
        pdrugname: new FormControl('', [Validators.required]),
        pstrength: new FormControl('', [Validators.required]),
        pconsume: new FormControl('', [Validators.required]),
      }),

      otcdrugs: new FormGroup({
        odrugname: new FormControl('', [Validators.required]),
        ostrength: new FormControl('', [Validators.required]),
        oconsume: new FormControl('', [Validators.required]),
      }),

      Pastmedication: new FormGroup({
        pmdrugname: new FormControl('', [Validators.required]),
        pmstrength: new FormControl('', [Validators.required]),
        pmconsume: new FormControl('', [Validators.required]),
      }),
    });

    {
      this.immunizationForm = this.formBuilder.group({
        vname: new FormControl('', [Validators.required]),
        // nodose: new FormControl('', [Validators.required]),
        vdate: new FormControl('', [Validators.required]),
        gvname: new FormControl('', [Validators.required]),
        gvdate: new FormControl('', [Validators.required]),
      });
    }
  }

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem('userDetails1')).id;
    this.patientid = id;
    // const { id } = this.activatedRoute.snapshot.params;
    // this.patientid = id;

    this.patientService.getPatientData(this.patientid).subscribe(
      (res: any) => {
        console.log(JSON.stringify(res));
        this.success = true;
        this.demographicsForm.get('fname').setValue(res.demographics.fname);
        this.demographicsForm.get('lname').setValue(res.demographics.lname);
        this.demographicsForm.get('dob').setValue(res.demographics.dob);
        this.demographicsForm.get('gender').setValue(res.demographics.gender);
        this.demographicsForm
          .get('ethnicity')
          .setValue(res.demographics.ethnicity);
        this.demographicsForm
          .get('education')
          .setValue(res.demographics.education);
        this.demographicsForm
          .get('occupation')
          .setValue(res.demographics.occupation);
        this.demographicsForm.get('address').setValue(res.demographics.address);
        this.demographicsForm.get('contact').setValue(res.demographics.contact);
        this.demographicsForm
          .get('medicalData')
          .setValue(res.demographics.medicalData);
        this.demographicsForm
          .get('familymedicalData')
          .setValue(res.demographics.familymedicalData);
        this.demographicsForm
          .get('surgeries')
          .setValue(res.demographics.surgeries);
        this.demographicsForm
          .get('provider')
          .setValue(res.demographics.provider);
        this.demographicsForm
          .get('medicalData')
          .setValue(res.demographics.medicalData);

        this.medicationallergiesForm
          .get('drugreaction')
          .setValue(res.medication.drugreaction);

        this.medicationallergiesForm
          .get('socialdrugs')
          .setValue(res.medication.socialdrugs);

        this.medicationallergiesForm
          .get('herbsdetails')
          .setValue(res.medication.herbsdetails);

        this.medicationallergiesForm
          .get('drugallergies')
          .setValue(res.medication.drugallergies);

        this.medicationallergiesForm
          .get('Prescribeddrugs.pdrugname')
          .setValue(res.medication.Prescribeddrugs.pdrugname);

        this.medicationallergiesForm
          .get('Prescribeddrugs.pstrength')
          .setValue(res.medication.Prescribeddrugs.pstrength);

        this.medicationallergiesForm
          .get('Prescribeddrugs.pconsume')
          .setValue(res.medication.Prescribeddrugs.pconsume);

        this.medicationallergiesForm
          .get('otcdrugs.odrugname')
          .setValue(res.medication.otcdrugs.odrugname);

        this.medicationallergiesForm
          .get('otcdrugs.ostrength')
          .setValue(res.medication.otcdrugs.ostrength);

        this.medicationallergiesForm
          .get('otcdrugs.oconsume')
          .setValue(res.medication.otcdrugs.oconsume);

        this.medicationallergiesForm
          .get('Pastmedication.pmdrugname')
          .setValue(res.medication.Pastmedication.pmdrugname);

        this.medicationallergiesForm
          .get('Pastmedication.pmstrength')
          .setValue(res.medication.Pastmedication.pmstrength);

        this.medicationallergiesForm
          .get('Pastmedication.pmconsume')
          .setValue(res.medication.Pastmedication.pmconsume);

        this.immunizationForm.get('vname').setValue(res.immunization.vname);
        this.immunizationForm.get('vdate').setValue(res.immunization.vdate);
        this.immunizationForm.get('gvname').setValue(res.immunization.gvname);
        this.immunizationForm.get('gvdate').setValue(res.immunization.gvdate);
      },

      (err: any) => {
        console.log(JSON.stringify(err));
        // this.errors = err;
      }
    );
  }

  // methods
  // create

  demographicsSubmit() {
    if (this.success == true) {
      this.medicationallergiesSubmit();
    } else
      this.patientService
        .createDemographics(
          this.demographicsForm.value,
          this.patientid,
          this.medicationallergiesForm.value,
          this.immunizationForm.value
        )
        .subscribe(
          (res: any) => {
            console.log(JSON.stringify(res));
            this.success = true;
          },
          (err: any) => {
            console.log(JSON.stringify(err));
            this.errors = err;
          }
        );
  }

  // update is pending

  medicationallergiesSubmit() {
    this.patientService
      .updatePatient(
        this.demographicsForm.value,
        this.patientid,
        this.medicationallergiesForm.value,
        this.immunizationForm.value
      )
      .subscribe(
        (res: any) => {
          console.log(JSON.stringify(res));
        },
        (err: any) => {
          console.log(JSON.stringify(err));
          this.errors = err;
        }
      );
  }
}
