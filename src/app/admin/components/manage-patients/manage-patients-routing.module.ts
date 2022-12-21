import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
const managePatientRoutes: Routes = [
  {
    path: '',
    component: PatientListComponent,
  },
  { path: 'patient-view/:id', component: PatientViewComponent },
  { path: 'patient-appointments/:id', component: PatientAppointmentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(managePatientRoutes)],
  exports: [RouterModule],
})
export class ManagePatientsRoutingModule {}
