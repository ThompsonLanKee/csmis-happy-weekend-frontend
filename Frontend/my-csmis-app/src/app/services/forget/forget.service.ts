import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService  {

  private apiUrl = 'http://localhost:8081'; // Replace with your backend endpoint

  constructor(private http: HttpClient) {}

  // constructor(private forgotPasswordService: ForgotPasswordService) {}


  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { email });
  }

  verifyOtp(email: string, otpCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, { email, otpCode }).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
        }
      })
    );
  }

  resendOtp(email: string) {
    return this.http.post<any>(`${this.apiUrl}/resend-otp`, { email }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          if (error.status === 404) {
            errorMsg = 'Email not found.';
          } else if (error.status === 500) {
            errorMsg = 'Server error occurred.';
          }
        }
        return throwError(errorMsg);
      })
    );
  }




  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/showusers`);
  // }

  // getLoginUserByOTP(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/verify-otp`);
  // }
}
