import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, JsonpClientBackend, provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmboxComponent } from './shared/confirmbox/confirmbox.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { ForgetComponent } from './components/csmis-forget/forget.component';
import { AddEmployeeComponent } from './components/csmis-employee/add-employee/add-employee.component';
import { ExcelImportComponent } from './components/csmis-employee/excel-import/excel-import.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EmployeeListComponent } from './components/csmis-employee/employee-list/employee-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { OperatorSidebarComponent } from './operator/operator-sidebar/operator-sidebar.component';
import { OperatorMainComponent } from './operator/operator-main/operator-main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './shared/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { RouterModule } from '@angular/router';
import { CsmisDoorlogImportComponent } from './components/csmis-doorlog-import/csmis-doorlog-import.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './shared/SharedModule';
import { DivisionListComponent } from './components/csmis-division/division-list/division-list.component';
import { UpdateEmployeeComponent } from './components/csmis-employee/update-employee/update-employee.component';
import { AddDivisionComponent } from './components/csmis-division/add-division/add-division.component';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmboxComponent,
    HeaderComponent,
    ForgetComponent,
    ExcelImportComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    AdminMainComponent,
    OperatorSidebarComponent,
    OperatorMainComponent,
    NavbarComponent,
    AdminSidebarComponent,
    CsmisDoorlogImportComponent,
    DivisionListComponent,
    UpdateEmployeeComponent,
    AddDivisionComponent,
    LoginComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    DataTablesModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
