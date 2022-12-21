import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientBillingComponent } from './components/billing/patient-billing/patient-billing.component';

import { VisitHistoryComponent } from './components/history/visit-history/visit-history.component';
import { PatientMainContentComponent } from './components/layout/patient-main-content/patient-main-content.component';
import { PtDashboardComponent } from './components/pData/pt-dashboard/pt-dashboard.component';

import { PatientProfileComponent } from './components/profile/patient-profile/patient-profile.component';
import { PatientScheduleAppointmentComponent } from './components/schedule-appointment/patient-schedule-appointment/patient-schedule-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: PatientMainContentComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: PatientScheduleAppointmentComponent },
          {
            path: 'patient-dashboard',
            component: PatientScheduleAppointmentComponent,
          },

          {
            path: 'patient-profile',
            component: PatientProfileComponent,
          },
          {
            path: 'patient-schedule-appointment',
            component: PatientScheduleAppointmentComponent,
          },
          {
            path: 'patient-billing',
            component: PatientBillingComponent,
          },
          {
            path: 'visit-history',
            component: VisitHistoryComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
