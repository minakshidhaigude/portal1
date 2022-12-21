import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { RegisterComponent } from '../shared-component/components/auth/register/register.component';
import { AdDashboardComponent } from './components/dashboard/ad-dashboard/ad-dashboard.component';

import { AdmMainContentComponent } from './components/layout/adm-main-content/adm-main-content.component';
import { ManageAppointmentsComponent } from './components/manage-appointments/manage-appointments.component';
import { ManagePatientsComponent } from './components/manage-patients/manage-patients/manage-patients.component';
import { ManagePhysicianComponent } from './components/manage-physician/manage-physician.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdmMainContentComponent,

    children: [
      {
        path: '',

        children: [
          {
            path: '',
            component: AdDashboardComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'manage-users',
            component: ManageUsersComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'admin-dashboard',
            component: AdDashboardComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'manage-physicians',
            component: ManagePhysicianComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'manage-appointments',
            component: ManageAppointmentsComponent,
            canActivate: [AuthGuard],
          },

          {
            path: 'manage-patients',
            loadChildren: () =>
              import(
                './components/manage-patients/manage-patients.module'
              ).then((m) => m.ManagePatientsModule),
            canActivate: [AuthGuard],
          },
        ],
      },

      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
