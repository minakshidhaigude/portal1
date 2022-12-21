import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ManagePatientsRoutingModule } from './manage-patients-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';

import { DataTablesModule } from 'angular-datatables';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientVitalsComponent } from './patient-vitals/patient-vitals.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManagePatientsRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PatientListComponent,
    ManagePatientsComponent,
    PatientViewComponent,
    PatientAppointmentsComponent,
    PatientVitalsComponent,
  ],
})
export class ManagePatientsModule {}
