import { Component } from '@angular/core';
import { SidebarToggleService } from '../services/Sidebar/sidebar-toggle.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private sidebarToggleService: SidebarToggleService,private authService:AuthenticationService,private router:Router) {}

  onToggleSidebar() {
    console.log('Toggle button clicked');
    this.sidebarToggleService.toggleSidebar();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
