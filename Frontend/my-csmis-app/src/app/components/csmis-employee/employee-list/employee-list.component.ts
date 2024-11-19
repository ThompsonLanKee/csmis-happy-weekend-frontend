import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../services/csmis-employee/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../../models/csmis-employee';
import { MatPaginator } from '@angular/material/paginator';
import { DivisionService } from '../../../services/csmis-division/division.service';
import { ActivatedRoute } from '@angular/router';
import { Division } from '../../../models/csmis-Division';
import { Department } from '../../../models/csmis-Department';
import { Team } from '../../../models/csmis-Team';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, AfterViewInit{
  employees: Employee[] = [];
  private dataTableInitialized = false;

  updateEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
        data: { employee }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadEmployees();
        }
      });
    });
  }

  deleteEmployee(id: number): void {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.employeeService.deleteEmployeeById(id).subscribe(() => {
        console.log("Employee with ID " + id + " deleted.");
        alert("Successfully deleted");
        this.loadEmployees();
      });
    }
  }

  constructor(private renderer: Renderer2, private el: ElementRef,private employeeService: EmployeeService,private dialog: MatDialog,) {}


  ngOnInit(): void {
    this.loadEmployees();
    this.reloadDataTable();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  private initializeDataTable(): void {
    const table = this.el.nativeElement.querySelector('#employeeList');
    if (table) {
      this.renderer.listen('window', 'load', () => {
        ($(table) as any).DataTable();
        this.dataTableInitialized = true;
      });
    }
  }

  private reloadDataTable(): void {
    const table = this.el.nativeElement.querySelector('#employeeList');
    if (table) {
      ($(table) as any).DataTable().clear(); // Clear existing table data
      ($(table) as any).DataTable().rows.add(this.employees); // Add new data
      ($(table) as any).DataTable().draw(); // Redraw the table
    }
  }

}
