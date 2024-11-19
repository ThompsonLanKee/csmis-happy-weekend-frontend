import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Division } from '../../models/csmis-Division';
import { catchError, Observable, throwError } from 'rxjs';
import { Department } from '../../models/csmis-Department';
import { Team } from '../../models/csmis-Team';
import { Employee } from '../../models/csmis-employee';
import { Page } from '../../models/Page';
import { PaginatedResponse } from '../../models/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'http://localhost:8081/api/employees';



  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.apiUrl}/divisions`);
  }

  getDivisionById(divisionId: number): Observable<Division> {
    const url = `http://localhost:8081/api/division/`+"/"+divisionId;
    return this.http.get<Division>(url);
  }

  getDivisionByName(name:String):Observable<any>{
    let url:string ="http://localhost:8081/api/division/showbyDivisionName"+"/"+name;
    return this.http.get<any>(url);
  }

  getDepartmentsByDivision(divisionId: number): Observable<Department[]> {
    const url = `http://localhost:8081/api/employees/departments`;
    const params = new HttpParams().set('divisionId', divisionId.toString());
    return this.http.post<Department[]>(url, null, { params });
  }

  getDepartmentByName(name:String,division:String):Observable<any>{
    // let url:string ="http://localhost:8081/api/department/showbyDepartmentName"+"/"+division+"/"+name;
    let primitiveName: string = name.toString();
  let primitiveDivision: string = division.toString();
  let url: string = `http://localhost:8081/api/department/showbyDepartmentName?division=${encodeURIComponent(primitiveDivision)}&name=${encodeURIComponent(primitiveName)}`;
    return this.http.get(url);
  }

  getDepartmentById(id:number):Observable<any>{
    let url:string =this.apiUrl+"/showbyDepartmentid/"+id;
    return this.http.get(url);
  }

  // Updated method to get teams by department
  getTeamsByDepartment(departmentId: number): Observable<Team[]> {
    const url = `http://localhost:8081/api/employees/teams`;
    const params = new HttpParams().set('departmentId', departmentId.toString());
    return this.http.post<Team[]>(url, null, { params });
  }

  getTeamByName(department:string,division:string,name:string):Observable<any>{
    let primitiveName: string = name.toString();
    let primitiveDivision: string = division.toString();
    let primitiveDepartment: string = department.toString();
    let url: string = `http://localhost:8081/api/team/showbyTeamName?department=${encodeURIComponent(primitiveDepartment)}&division=${encodeURIComponent(primitiveDivision)}&name=${encodeURIComponent(primitiveName)}`;
    return this.http.get(url);
  }

  getTeamById(id:number):Observable<any>{
    let url:string =this.apiUrl+"/showbyTeamid/"+id;
    return this.http.get(url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
  }

  getById(id:number):Observable<any>{
    let url:string =this.apiUrl+"/showbyEmployee/"+id;
    return this.http.get(url);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/showEmployees`);
  }

  deleteEmployeeById(id: number): Observable<void> {
    return this.http.put<void>(`http://localhost:8081/api/employees/deleteEmployee/${id}`, {}, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error deleting employee:', error);
          return throwError(() => error);
        })
      );
  }

  getEmployeeById(id: number): Observable<Employee> {
    const endpoint = `http://localhost:8081/api/employees/showbyEmployee/${id}`;
    return this.http.get<Employee>(endpoint);
  }

  // deleteEmployee(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/deleteEmployee/${id}`);
  // }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/updateEmployee/${employee.id}`, employee);
  }

}
