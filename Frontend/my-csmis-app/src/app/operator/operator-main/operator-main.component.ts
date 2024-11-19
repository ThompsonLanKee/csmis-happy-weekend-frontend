import { Component } from '@angular/core';
import { SidebarToggleService } from '../../services/Sidebar/sidebar-toggle.service';

@Component({
  selector: 'app-operator-main',
  templateUrl: './operator-main.component.html',
  styleUrl: './operator-main.component.css'
})
export class OperatorMainComponent {
  isOpen: boolean = true; // Set the initial state of the sidebar

  constructor(private sidebarToggleService: SidebarToggleService) {}

  toggleSidebar() {
    this.sidebarToggleService.toggleSidebar();
  }
}
