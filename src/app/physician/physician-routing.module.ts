import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PyDashboardComponent } from './components/dashboard/py-dashboard/py-dashboard.component';
import { PhyPatientDetailsComponent } from './components/details/phy-patient-details/phy-patient-details.component';
import { PhyPatientVisitsComponent } from './components/details/phy-patient-visits/phy-patient-visits.component';
import { PhyMainContentComponent } from './components/layout/phy-main-content/phy-main-content.component';
import { PhyCaptureDetailsComponent } from './components/order/phy-capture-details/phy-capture-details.component';
import { PhyVisitHistoryComponent } from './components/visitHistory/phy-visit-history/phy-visit-history.component';

const routes: Routes = [
  {
    path: '',
    component: PhyMainContentComponent,

    children: [
      {
        path: '',
        children: [
          { path: '', component: PyDashboardComponent },
          { path: 'physician-dashboard', component: PyDashboardComponent },
          {
            path: 'capture/:id/:id1',
            component: PhyCaptureDetailsComponent,
          },
          {
            path: 'visit-history',
            component: PhyVisitHistoryComponent,
          },
          {
            path: 'visit-details/:id',
            component: PhyCaptureDetailsComponent,
          },
          {
            path: 'patient-details/:id/:id1',
            component: PhyPatientDetailsComponent,
          },
          {
            path: 'patient-visits/:id/:id1',
            component: PhyPatientVisitsComponent,
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
export class PhysicianRoutingModule {}
