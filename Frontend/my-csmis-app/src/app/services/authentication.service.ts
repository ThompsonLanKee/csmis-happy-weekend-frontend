import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

import { ChangePasswordRequest } from '../models/ChangePasswordRequest ';
import { LoginRequest } from '../models/LoginRequest ';
import { JwtResponse } from '../models/JwtResponse';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/auth';  // Your backend URL
  private tokenKey = 'authToken';
  public user: User | null | undefined; // Current user


  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}


  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.id) {
          localStorage.setItem(this.tokenKey, response.token); // Store token
          localStorage.setItem('id', JSON.stringify(response.id)); // Store user data
          console.log('User data stored in local storage:', response.id);
        } else {
          console.error('No user data received in login response.');
        }
      })
    );
  }
  
  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/change-password`, changePasswordRequest, { 
      responseType: 'text' as 'json'  // Cast 'text' to the correct type
    });
  }
  
  


  // Login method
//   login(identityNo: string, password: string): Observable<any> {
//     return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, { identityNo, password }).pipe(
//         tap((response: any) => {
//             // Store the token
//             console.log(response);
//             localStorage.setItem(this.tokenKey, response.token);  
//             // Store the user information
//             localStorage.setItem('user', JSON.stringify(response.user)); 
//             console.log("Login response with authorities: " + JSON.stringify(response.authorities));
//         })
//     );
// }


// changePassword(staffId: string, newPassword: string): Observable<any> {
//   const params = { staffId, newPassword };
//   return this.http.post<any>(`${this.apiUrl}/change-password`, params);
// }


  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey);  // Remove token
    this.router.navigate(['/login']);  // Navigate to login
  }

  // Check if the user is authenticated by verifying the token
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Get the role of the user from the JWT
  // Inside your AuthenticationService
getUserRole(): string | null {
  const token = this.getToken();
  if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);  // Debugging decoded token

      // Extract the role based on how you've set it in your JWT
      return decodedToken.role || decodedToken.roles || decodedToken.authorities || null;
  }
  return null;
}

  
  
  // Get JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
//   getUserId(): number | null {
//     const userData = localStorage.getItem('user'); 
//     console.log("d mhr id 1 khu"+userData);// Get user data from local storage
//     if (!userData) {
//         console.warn('No user data found in local storage.'); // Log if no data found
//         return null; // Return null if no user data
//     }

//     try {
//         const user = JSON.parse(userData); // Parse user data
//         console.log("service htae ka" + user);
//         return user ;
//     } catch (error) {
//         console.error('Failed to parse user data from local storage:', error);
//         return null; // Return null if parsing fails
//     }
// }
getUserId(): number | null {
  const userData = localStorage.getItem('id'); // Retrieve user data
  if (!userData || userData === 'undefined') {
    console.warn('No valid user data found in local storage.');
    return null; // Return null if data is missing or invalid
  }

  try {
    const user = JSON.parse(userData); // Attempt to parse user data
    console.log("Parsed user data:", user); // Debug parsed data
    return user || null; // Return user ID or null if it doesn't exist
  } catch (error) {
    console.error('Failed to parse user data from local storage:', error);
    return null; // Return null if parsing fails
  }
}

getUsername(): string | null {
  const token = this.getToken(); // Retrieve the token from localStorage
  if (token) {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token); // Decode the token
      console.log('Decoded Token:', decodedToken); // Debugging decoded token
      return decodedToken.username || null; // Adjust key if necessary
    } catch (error) {
      console.error('Error decoding token:', error); // Log errors if decoding fails
      return null;
    }
  }
  return null; // Return null if no token is found
}




}
// changePassword(userId: number, newPassword: string): Observable<any> {
//   const token = localStorage.getItem('token'); // Get the JWT token from local storage
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token}`
//   });

//   return this.http.post(`${this.apiUrl}/change-password`, { userId, newPassword }, { headers });
// }
// }
