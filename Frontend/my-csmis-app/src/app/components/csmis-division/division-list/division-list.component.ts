import { Component } from '@angular/core';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrl: './division-list.component.css'
})
export class DivisionListComponent {
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
  ];

  endpoint = 'http://localhost:8081/api/employees/divisions';
}
