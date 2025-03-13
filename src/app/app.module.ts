import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // ✅ Import it here
import { HttpClientModule } from '@angular/common/http';
//import { JwtHelperService } from './services/jwt-helper.service';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import Swal from 'sweetalert2';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ManageAdminComponent } from './components/manage-admin/manage-admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    AddOrganizationComponent,
    AddUserComponent,
    ManageAdminComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//JwtHelperService