import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ManageAdminComponent } from './components/manage-admin/manage-admin.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-organization', component: AddOrganizationComponent },
  { path: 'add-user', component: AddUserComponent},
  {path: 'manage-admin', component:ManageAdminComponent},
  {path: 'profile', component:ProfileComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
