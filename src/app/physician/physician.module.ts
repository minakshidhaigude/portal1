import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PhysicianRoutingModule } from './physician-routing.module';
import { PRecordsComponent } from './components/pData/p-records/p-records.component';
import { PyDashboardComponent } from './components/dashboard/py-dashboard/py-dashboard.component';
import { LeftsidebarComponent } from './components/layout/leftsidebar/leftsidebar.component';
import { PhyFooterComponent } from './components/layout/phy-footer/phy-footer.component';
import { PhyHeaderComponent } from './components/layout/phy-header/phy-header.component';
import { PhyMainContentComponent } from './components/layout/phy-main-content/phy-main-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhyCaptureDetailsComponent } from './components/order/phy-capture-details/phy-capture-details.component';
import { PhysicianService } from './services/physician.service';
import { PhyVisitHistoryComponent } from './components/visitHistory/phy-visit-history/phy-visit-history.component';
import { PhyVisitDetailsComponent } from './components/details/phy-visit-details/phy-visit-details.component';
import { httpInterceptors } from '../core/interceptors';
import { PhyPatientDetailsComponent } from './components/details/phy-patient-details/phy-patient-details.component';
import { DataTablesModule } from 'angular-datatables';
import { PhyPatientVisitsComponent } from './components/details/phy-patient-visits/phy-patient-visits.component';

@NgModule({
  declarations: [
    PRecordsComponent,
    PyDashboardComponent,
    LeftsidebarComponent,
    PhyFooterComponent,
    PhyHeaderComponent,
    PhyMainContentComponent,
    PhyCaptureDetailsComponent,
    PhyVisitHistoryComponent,
    PhyVisitDetailsComponent,
    PhyPatientDetailsComponent,
    PhyPatientVisitsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PhysicianRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [PhysicianService, httpInterceptors],
})
export class PhysicianModule {}
