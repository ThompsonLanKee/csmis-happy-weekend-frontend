import { Component, ViewChild } from '@angular/core';
import { SidebarToggleService } from '../../services/Sidebar/sidebar-toggle.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {

  isOpen: boolean = true; // Set the initial state of the sidebar

  constructor(private sidebarToggleService: SidebarToggleService) {}

  toggleSidebar() {
    this.sidebarToggleService.toggleSidebar();
  }

}
