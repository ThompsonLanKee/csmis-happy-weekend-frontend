import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/csmis-employee';
import { Division } from '../../../models/csmis-Division';
import { Department } from '../../../models/csmis-Department';
import { Team } from '../../../models/csmis-Team';
import { EmployeeService } from '../../../services/csmis-employee/employee.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from 'express';
import { StatusType } from '../../../models/StatusType';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{

  addEmployeeForm: FormGroup;
  divisions: Division[] = [];
  departments: Department[] = [];
  teams: Team[] = [];
  selectedDivisionId: number | null = null;
  selectedDepartmentId: number | null = null;
  selectedTeamId: number | null = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.addEmployeeForm = this.fb.group({
      staff_ID: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      division: ['', Validators.required],
      department: ['', Validators.required],
      team: ['', Validators.required],
      joined_at: ['', [Validators.required, this.pastOrPresentDateValidator]]
    });
  }

  pastOrPresentDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate > today ? { futureDate: true } : null;
  }

  departmentValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!this.selectedDivisionId && !control.value) {
      return { departmentRequired: true };
    }
    return null;
  }

  teamValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!this.selectedDepartmentId && !control.value) {
      return { teamRequired: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.loadDivisions();
  }

  loadDivisions(): void {
    this.employeeService.getDivisions().subscribe({
      next: (data) => this.divisions = data,
      error: (err) => console.error('Failed to load divisions:', err),
    });
  }

  onDivisionChange(): void {
    this.departments = [];
    this.teams = [];
    if (this.selectedDivisionId) {
      this.employeeService.getDepartmentsByDivision(this.selectedDivisionId).subscribe({
        next: (data) => this.departments = data,
        error: (err) => console.error('Failed to load departments:', err),
      });
    }
    this.addEmployeeForm.get('department')?.updateValueAndValidity();
  }

  onDepartmentChange(): void {
    this.teams = [];
    if (this.selectedDepartmentId) {
      this.employeeService.getTeamsByDepartment(this.selectedDepartmentId).subscribe({
        next: (data) => this.teams = data,
        error: (err) => console.error('Failed to load teams:', err),
      });
    }
    this.addEmployeeForm.get('team')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.addEmployeeForm.valid) {
      const employeeData = this.addEmployeeForm.value;
      const newEmployee: Employee = {
        staff_ID: employeeData.staff_ID,
        name: employeeData.name,
        email: employeeData.email,
        division: { id: this.selectedDivisionId!, name: '', isDelete: false },
        department: { id: this.selectedDepartmentId!, name: '', isDelete: false },
        team: { id: this.selectedTeamId!, name: '', isDelete: false },
        joined_at: employeeData.joined_at,
        id: 0,
        is_active: false,
        status: StatusType.ACTIVE,
        isDeleted: false
      };

      this.employeeService.addEmployee(newEmployee).subscribe({
        next: (response) => {
          console.log('Employee added:', response);
          alert('Employee added successfully!');
          this.addEmployeeForm.reset();
          this.selectedDivisionId = null;
          this.selectedDepartmentId = null;
          this.selectedTeamId = null;
          this.departments = [];
          this.teams = [];
        },
        error: (err) => console.error('Failed to add employee:', err),
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
