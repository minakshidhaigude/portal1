import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';

import { PatientBillingComponent } from './components/billing/patient-billing/patient-billing.component';
import { PtDashboardComponent } from './components/pData/pt-dashboard/pt-dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import 'flatpickr/dist/flatpickr.css';
import { PatientHeaderComponent } from './components/layout/patient-header/patient-header.component';
import { PatientFooterComponent } from './components/layout/patient-footer/patient-footer.component';
import { PatientLeftbarComponent } from './components/layout/patient-leftbar/patient-leftbar.component';
import { PatientMainContentComponent } from './components/layout/patient-main-content/patient-main-content.component';
import { VisitHistoryComponent } from './components/history/visit-history/visit-history.component';
import { PatientProfileComponent } from './components/profile/patient-profile/patient-profile.component';
import { PatientScheduleAppointmentComponent } from './components/schedule-appointment/patient-schedule-appointment/patient-schedule-appointment.component';
import { httpInterceptors } from '../core/interceptors';
import ProfileService from './services/profile.service';
import { ScheduleService } from './services/schedule.service';
import { PatientService } from './services/patient.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PatientRoutingModule,
    NgbModalModule,
    ReactiveFormsModule,

    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    PtDashboardComponent,
    PatientBillingComponent,
    PatientHeaderComponent,
    PatientFooterComponent,
    PatientLeftbarComponent,
    PatientMainContentComponent,
    VisitHistoryComponent,
    PatientProfileComponent,
    PatientScheduleAppointmentComponent,
  ],

  exports: [],
  providers: [
    ProfileService,
    ScheduleService,
    PatientService,
    httpInterceptors,
  ],
})
export class PatientModule {}
