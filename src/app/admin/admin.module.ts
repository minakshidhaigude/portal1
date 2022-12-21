import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhysicianRecordComponent } from './components/records/physician-record/physician-record.component';
import { PatientRecordComponent } from './components/records/patient-record/patient-record.component';
import { AdDashboardComponent } from './components/dashboard/ad-dashboard/ad-dashboard.component';
import { LeftsidebarComponent } from './components/layout/leftsidebar/leftsidebar.component';
import { AdmHeaderComponent } from './components/layout/adm-header/adm-header.component';
import { AdmMainContentComponent } from './components/layout/adm-main-content/adm-main-content.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManagePhysicianComponent } from './components/manage-physician/manage-physician.component';
import { ManageAppointmentsComponent } from './components/manage-appointments/manage-appointments.component';
import { AdminService } from './services/admin.service';
import { httpInterceptors } from '../core/interceptors';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    PhysicianRecordComponent,
    PatientRecordComponent,
    AdDashboardComponent,
    LeftsidebarComponent,
    AdmHeaderComponent,
    AdmMainContentComponent,
    ManageUsersComponent,
    ManagePhysicianComponent,
    ManageAppointmentsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,

    DataTablesModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [AdminService, httpInterceptors],
})
export class AdminModule {}
