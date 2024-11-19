import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  loggedInUser: any = null;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loggedInUser = this.getLoggedInUser();
  }

  getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  // ngOnInit(): void {
  //   this.loggedInUser = this.userService.getLoggedInUser();
  // }

  logout() {
    this.userService.logout();
    // Optionally redirect the user to the login page
  }

}
