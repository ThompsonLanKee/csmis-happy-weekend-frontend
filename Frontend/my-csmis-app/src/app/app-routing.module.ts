import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { ForgetComponent } from './components/csmis-forget/forget.component';
import { AddEmployeeComponent } from './components/csmis-employee/add-employee/add-employee.component';
import { ExcelImportComponent } from './components/csmis-employee/excel-import/excel-import.component';
import { EmployeeListComponent } from './components/csmis-employee/employee-list/employee-list.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { OperatorMainComponent } from './operator/operator-main/operator-main.component';
import { CsmisDoorlogImportComponent } from './components/csmis-doorlog-import/csmis-doorlog-import.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RoleGuard } from './guards/role-guard.guard';


// const routes: Routes = [
//   { path: '',
//     component: ,
//     children: [
//     {path:'cheatsheet',component:CheatsheetsComponent},
//     {}]},
//   {
//     path: '',
//     component: MainLayoutComponent,
//     children: [
//       { path: '', component: HomeComponent },
//       { path: 'cheatsheets', component: CheatsheetComponent },
//       { path: 'cheatsheets/:id', component: CheatsheetDetailComponent },
//       {
//         path: 'cheatsheets/section/:sectionName',
//         component: CheatsheetComponent,
//       },
//       {
//         path: 'cheatsheets/tag/:tagName',
//         component: CheatsheetComponent,
//       },
//       {
//         path: 'cheatsheets/edit/:id',
//         component: EditCheatsheetComponent,
//         canActivate: [AuthGuard],
//       },
//       {
//         path: 'create',
//         component: AddCheatsheetComponent,
//         canActivate: [AuthGuard],
//       },
//       {
//         path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]
//       },
//       { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
//       {
//         path: 'register',
//         component: RegisterComponent,
//         canActivate: [LoginGuard],
//       },
//     ],
//   },
//   {
//     path: "admin",
//     component: AdminLayoutComponent,
//     children: [
//       { path: '', component: HomeComponent },
//       { path: 'cheatsheets', component: CheatsheetComponent },
//     ]
//   }
// ];


// const routes: Routes = [
//   // {path:'',redirectTo:'',pathMatch:'full'},
//   {path:'',component:AdminMainComponent},
//   {path:'user/forget',component:ForgetComponent},
//   {path:'excel/import/employee',component:ExcelImportComponent},
//   {path:'excel/import/user',component:UserImportComponent},
//   {path:'excel/register/employee',component:AddEmployeeComponent},
//   {path:'employee/list',component:EmployeeListComponent}
// ];
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'profile', component: AdminMainComponent},

{ path: 'dashboard', component: AdminMainComponent , canActivate: [RoleGuard], data: { role: 'ADMIN' }},
  { path: 'employees', component: EmployeeListComponent , canActivate: [RoleGuard], data: { role: 'ADMIN' }},
  {
    path: 'employee',
    children: [
      { path: 'upload', component: ExcelImportComponent , canActivate: [RoleGuard], data: { role: 'ADMIN' }},
      { path: 'add', component: AddEmployeeComponent , canActivate: [RoleGuard], data: { role: 'ADMIN' }}
    ]
  },{ path: 'operator', component: EmployeeListComponent, canActivate: [RoleGuard], data: { role: 'ADMIN' }}
  ,{
    path: 'doorlog',
    children: [
      { path: 'upload', component: CsmisDoorlogImportComponent , canActivate: [RoleGuard], data: { role: 'ADMIN' }},
      { path: 'add', component: AddEmployeeComponent, canActivate: [RoleGuard], data: { role: 'ADMIN' } }
    ]
  },

  {
    path: 'operator',
    children: [
      { path: 'update', component: ExcelImportComponent, canActivate: [RoleGuard], data: { role: 'OPERATOR' } },
      { path: 'add', component: AddEmployeeComponent , canActivate: [RoleGuard], data: { role: 'OPERATOR' }}
    ]
  },
  { path: 'reports', component: ExcelImportComponent, canActivate: [RoleGuard], data: { role: 'OPERATOR' } },
  { path: 'operator/dashboard', component: OperatorMainComponent, canActivate: [RoleGuard], data: { role: 'OPERATOR' }},
  { path: 'operator/lunch/reigster', component: OperatorMainComponent, canActivate: [RoleGuard], data: { role: 'OPERATOR' } },
  { path: 'operator/avoide/meat', component: OperatorMainComponent, canActivate: [RoleGuard], data: { role: 'OPERATOR' } },
  { path: 'operator/salary/history', component: OperatorMainComponent, canActivate: [RoleGuard], data: { role: 'OPERATOR' } },
  { path: 'operator/doorlog/history', component: OperatorMainComponent, canActivate: [RoleGuard], data: { role: 'OPERATOR' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
