import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './admin/components/manage-users/manage-users.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SharedComponentModule } from './shared-component/shared-component.module';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./shared-component/shared-component.module').then(
        (m) => m.SharedComponentModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'physician',
    loadChildren: () =>
      import('./physician/physician.module').then((m) => m.PhysicianModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'physician'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
