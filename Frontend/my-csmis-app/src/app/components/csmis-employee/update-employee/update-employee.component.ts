import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../../models/csmis-employee';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/csmis-employee/employee.service';
import { Department } from '../../../models/csmis-Department';
import { Division } from '../../../models/csmis-Division';
import { Team } from '../../../models/csmis-Team';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusType } from '../../../models/StatusType';
import { forkJoin, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {

  updateEmployeeForm: FormGroup;
  divisions: Division[] = [];
  departments: Department[] = [];
  teams: Team[] = [];
  selectedDivisionId: number | null = null;
  selectedDepartmentId: number | null = null;
  selectedTeamId: number | null = null;
  id: number = 0;
  employee: Employee = {} as Employee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>
  ) {
    this.updateEmployeeForm = this.fb.group({
      staff_ID: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      division: ['', Validators.required],
      department: ['', Validators.required],
      team: ['', Validators.required],
      joined_at: ['', [Validators.required, this.pastOrPresentDateValidator]]
    });
  }


  ngOnInit(): void {

    this.loadDivisions();
    this.loadDepartmentsAndTeams();
    if (this.data && this.data.employee) {
      this.employee = this.data.employee;
      this.id = this.employee.id;
      this.fetchEmployee(this.id); // Load the employee details into the form
    }

    this.updateEmployeeForm.get('division')?.valueChanges.subscribe((divisionId) => {
      this.selectedDivisionId = divisionId;
      this.onDivisionChange();
    });

    // Subscribe to department changes to dynamically load teams
    this.updateEmployeeForm.get('department')?.valueChanges.subscribe((departmentId) => {
      this.selectedDepartmentId = departmentId;
      this.onDepartmentChange();
    });

    this.updateEmployeeForm.get('team')?.valueChanges.subscribe((teamId) => {
      this.selectedTeamId = teamId;
      this.loadTeams();
    });
  }

  pastOrPresentDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate > today ? { futureDate: true } : null;
  }

  fetchEmployee(id: number): void {
    this.employeeService.getById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.loadDivisions();

        forkJoin({
          division: this.employeeService.getDivisionByName(data.division),
          department: this.employeeService.getDepartmentByName(data.department, data.division),
          team: this.employeeService.getTeamByName(data.department, data.division, data.team),
        }).subscribe({
          next: (response) => {
            const division = response.division;
            const department = response.department;
            const team = response.team;
            this.selectedDivisionId = division.id ;
            this.selectedDepartmentId = department.id;
            this.selectedTeamId = team.id;

            console.log("Selected Division:", this.selectedDivisionId);
            console.log("Selected Department:", this.selectedDepartmentId);
            console.log("Selected Team:", this.selectedTeamId);

            this.updateEmployeeForm.patchValue({
              staff_ID: data.staff_ID,
              name: data.name,
              email: data.email,
              division: this.selectedDivisionId! || '',
              department: this.selectedDepartmentId! || '',
              team: this.selectedTeamId! || '',
              joined_at: this.formatDate(data.joined_at),
            });
            this.loadDepartmentsAndTeams();
            this.loadTeams();
          },
          error: (err) => {
            console.error('Error fetching related data:', err);
          }
        });
      },
      error: (error) => {
        console.error("Error fetching employee:", error);
      },
    });
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10); // 'YYYY-MM-DD'
  }

  loadDivisions(): void {
    this.employeeService.getDivisions().subscribe({
      next: (data) => {
        this.divisions = data;

        // Automatically select the division if it matches the employee's division
        if (this.selectedDivisionId) {
          const matchingDivision = this.divisions.find(
            (division) => division.id === this.selectedDivisionId
          );
          if (matchingDivision) {
            this.updateEmployeeForm.get('division')?.setValue(matchingDivision.id);
            this.selectedDivisionId = matchingDivision.id; // Update selectedDivisionId
          }
        }
      },
      error: (err) => console.error("Failed to load divisions:", err),
    });
  }

  loadDepartmentsAndTeams(): void {
    if (this.selectedDivisionId) {
      this.employeeService.getDepartmentsByDivision(this.selectedDivisionId).subscribe({
        next: (departments) => {
          this.departments = departments;

          if (this.selectedDepartmentId) {
            this.employeeService.getTeamsByDepartment(this.selectedDepartmentId).pipe(
              tap((teams) => {
                this.teams = teams; // Ensure teams are loaded
              })
            ).subscribe(() => {
              this.updateEmployeeForm.patchValue({
                team: this.selectedTeamId || '',
              });
            });
          }
        },
        error: (err) => console.error('Failed to load departments:', err),
      });
    }
  }
  loadTeams(): void {
    if (this.selectedDepartmentId) {
      this.employeeService.getTeamsByDepartment(this.selectedDepartmentId).subscribe({
        next: (teams) => {
          this.teams = teams;

          // Match the selected team and update the form
          if(this.selectedTeamId){
            const matchingTeam = this.teams.find(
              (team) => team.id === this.selectedTeamId
            );
            if(matchingTeam){
              this.updateEmployeeForm.get('team')?.setValue(matchingTeam ? matchingTeam.id : null);
              this.selectedTeamId=matchingTeam.id;
            }
          }
          // this.cdr.detectChanges(); // Ensure the form reflects the changes
        },
        error: (err) => {
          console.error('Failed to load teams:', err);
        }
      });
    }
  }

  onDivisionChange(): void {
    this.departments = [];
    this.teams = [];
    this.updateEmployeeForm.get('department')?.setValue(null);
    this.updateEmployeeForm.get('team')?.setValue(null);

    if (this.selectedDivisionId) {
      this.employeeService.getDepartmentsByDivision(this.selectedDivisionId).subscribe({
        next: (data) => {
          this.departments = data;
          const matchingDepartment = this.departments.find(
            (dept) => dept.id === this.selectedDepartmentId
          );
          if (matchingDepartment) {
            this.updateEmployeeForm.get('department')?.setValue(matchingDepartment.id);
          } else {
            this.selectedDepartmentId = null;
            this.updateEmployeeForm.get('department')?.setValue(null);
          }
          this.onDepartmentChange();
        },
        error: (err) => console.error('Failed to load departments:', err),
      });
    }
  }
  onDepartmentChange(): void {
    this.teams = [];
    this.updateEmployeeForm.get('team')?.setValue(null);

    if (this.selectedDepartmentId) {
      this.employeeService.getTeamsByDepartment(this.selectedDepartmentId).subscribe({
        next: (teams) => {
          this.teams = teams;
          const matchingTeam = this.teams.find((team) => team.id === this.selectedTeamId);
          if (matchingTeam) {
            this.updateEmployeeForm.get('team')?.setValue(matchingTeam.id);
          } else {
            this.selectedTeamId = null;
            this.updateEmployeeForm.get('team')?.setValue(null);
          }
        },
        error: (err) => console.error('Failed to load teams:', err),
      });
    }
  }


  onSubmit(): void {
    console.log('Form values:', this.updateEmployeeForm.value);

    if (this.updateEmployeeForm.valid) {
      const employeeData = this.updateEmployeeForm.value;

      // Validate selections
      if (!this.selectedDivisionId || !this.selectedDepartmentId || !this.selectedTeamId) {
        console.error('Missing division, department, or team selection');
        alert('Please select a valid division, department, and team.');
        return;
      }

      // Construct payload from form data and selected IDs
      const updatedEmployee: Employee = {
        ...this.data.employee, // Retain existing employee data
        staff_ID: employeeData.staff_ID,
        name: employeeData.name,
        email: employeeData.email,
        division: {
          id: this.selectedDivisionId,
          name: employeeData.divisionName || '', // Include division name if available
          isDelete: false
        },
        department: {
          id: this.selectedDepartmentId,
          name: employeeData.departmentName || '', // Include department name if available
          isDelete: false
        },
        team: {
          id: this.selectedTeamId,
          name: employeeData.teamName || '', // Include team name if available
          isDelete: false
        },
        joined_at: employeeData.joined_at
      };

      console.log('Final payload for update:', updatedEmployee);

      // Call service to update the employee
      this.employeeService.updateEmployee(updatedEmployee).subscribe({
        next: (response) => {
          console.log('Employee updated successfully:', response);
          alert('Employee updated successfully!');
          this.dialogRef.close(); // Close the dialog after update
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Failed to update employee. Please check the data and try again.');
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}

