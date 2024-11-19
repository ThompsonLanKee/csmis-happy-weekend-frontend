import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { JwtResponse } from '../../models/JwtResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  faUser = faUser;
  faLock = faLock;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      staffId: ['', Validators.required],  // Staff ID must be numeric
      password: ['', [Validators.required, Validators.minLength(6)]],         // Password must be at least 6 characters
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: JwtResponse) => {
          console.log('Login response:', response); // Debugging line
          console.log('isDefaultPassword:', response.defaultPassword); // Debugging log
  
          // Store the token and user information in local storage
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('id', JSON.stringify(response.id));
  
          // Extract role from authorities
          const roles = response.authorities.map(auth => auth.authority);
  
          if (roles.includes('ADMIN')) {
            // Redirect to the admin dashboard
            this.router.navigate(['/dashboard']);
          } else if (response.defaultPassword) {
            // Redirect to the change password page
            this.router.navigate(['/change-password']);
          } else {
            // Redirect to the operator dashboard
            this.router.navigate(['/operator/dashboard']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error || 'Invalid credentials';
        }
      });
    }
  }
  
  
get staffId() {
  return this.loginForm.get('staffId');
}

get password() {
  return this.loginForm.get('password');
}
}
