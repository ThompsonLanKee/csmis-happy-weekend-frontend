import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import {  faLock } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  message: string = '';
  passwordsDoNotMatch: boolean = false;
  faLock= faLock;
  storedId = localStorage.getItem('id');


  
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,

  ) {
    this.changePasswordForm = this.fb.group({
      id :this.storedId ? parseInt(this.storedId, 10) : '',
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    });

    this.changePasswordForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });

    console.log("id from LS"+this.storedId);
  }

  checkPasswords() {
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmNewPassword = this.changePasswordForm.get('confirmNewPassword')?.value;
    this.passwordsDoNotMatch = newPassword !== confirmNewPassword;
  }

  ngOnInit() {
    const userId = this.authService.getUserId();
    console.log("Retrieved User ID:", userId);
    if (!userId) {
      console.error("User ID is undefined or null");
    }
  }
  

  onChangePassword() {
    if (this.changePasswordForm.valid && !this.passwordsDoNotMatch) {
      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next: (response) => {
          console.log('Password change response:', response); 

          this.router.navigate(['/operator/dashboard']); // Navigate to dashboard

        },
        error: (errorResponse) => {
          console.error('Error response:', errorResponse); // Debugging
          if (errorResponse.status === 400) {
            this.message = 'Invalid request. Please check your input.';
          } else if (errorResponse.status === 401) {
            this.message = 'Unauthorized. Please log in and try again.';
          } else if (errorResponse.status === 500) {
            this.message = 'Server error. Please try again later.';
          } else {
            this.message = 'Failed to change password';
          }
        }
      });
    }
  }
  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }
  
} 