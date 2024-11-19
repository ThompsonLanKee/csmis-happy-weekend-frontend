import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const expectedRole = next.data['role']; // Use 'role' as defined in your routes
    const userRole = this.authService.getUserRole(); // Get the user role from the service

    if (userRole !== expectedRole) {
      // If the user role doesn't match the expected role, redirect to unauthorized page
      this.router.navigate(['/unauthorized']);
      return false;
    }
    return true;
  }
}
