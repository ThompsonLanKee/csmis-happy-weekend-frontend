import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forget/forget.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent implements OnInit{
  // passwordVisible: boolean = false;
  emailSent = false;
  otpSent = false;
  otpVerified = false;
  otpCode: string = '';  // Initialize with an empty string
  email: string = '';  // Initialize email with an empty string
  errorMessage: string = '';  // Initialize with an empty string
  otpExpirationTime = 20; // 5 minutes in seconds (300 seconds)
  timeRemaining: number = this.otpExpirationTime;  // Initialize to otpExpirationTime
  countdownSubscription: Subscription | undefined;  // Mark as optional
  otpExpired = false; // Flag for OTP expiration

  constructor(private forgotPasswordService: ForgotPasswordService) {}

  ngOnInit(): void {}

  // Function to send OTP
  onSubmit(forgotPasswordForm: NgForm) {
    if (forgotPasswordForm.valid) {
      this.email = forgotPasswordForm.value.email; // Capture email
      this.forgotPasswordService.sendResetPasswordEmail(this.email).subscribe({
        next: (response) => {
          this.emailSent = true;
          this.otpSent = true;
          this.otpExpired = false;
          this.startCountdown();
          alert("OTP sent. Please check your inbox.");
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.errorMessage = err.error?.message || "An error occurred. Please try again.";
        }
      });
    }
  }

  // Function to verify OTP
  verifyOtp() {
    console.log(this.email);
    console.log(this.otpCode);
    if (this.otpCode) {
      this.forgotPasswordService.verifyOtp(this.email, this.otpCode).subscribe({
        next: (response) => {
          this.otpVerified = true;
          this.stopCountdown();
          alert("OTP verified successfully. You are now logged in.");
        },
        error: (err) => {
          console.error('Error verifying OTP:', err);
          this.errorMessage = "Invalid OTP. Please try again.";
        }
      });
    }
  }

  // In your Angular component
  resendOtp() {
    console.log('Calling resendOtp with email:', this.email); // Debug log

    this.forgotPasswordService.resendOtp(this.email).subscribe({
      next: (response) => {
        alert("OTP resent. Please check your inbox.");
        this.otpExpired = false;
        this.startCountdown(); // Restart the countdown when OTP is resent
      },
      error: (err) => {
        console.error('Error occurred:', err);
        if (err.status === 404) {
          this.errorMessage = "Email not found. Please enter a registered email.";
        } else {
          this.errorMessage = "Failed to resend OTP. Please try again.";
        }
      }
    });
  }

  // Start countdown timer for OTP expiration (5 minutes)
  startCountdown() {
    this.timeRemaining = this.otpExpirationTime;  // Reset timer to 5 minutes
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.otpExpired = true; // OTP is expired after 5 minutes
        this.stopCountdown();
      }
    });
  }

  // Stop countdown timer
  stopCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  // Helper to format time as MM:SS
  formatTime(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  // Add leading zero to single-digit numbers
  padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
