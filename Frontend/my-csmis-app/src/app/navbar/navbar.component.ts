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
  userid: number = 0;
  constructor(private sidebarToggleService: SidebarToggleService,private authService:AuthenticationService,private router:Router,) {}

  ngOnInit(): void{
    this.userid = this.authService.getUserId() || 0;
  }


  onToggleSidebar() {
    console.log('Toggle button clicked');
    this.sidebarToggleService.toggleSidebar();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
