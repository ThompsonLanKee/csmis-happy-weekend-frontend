import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8081'; // Your backend URL

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/showusers`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteuser/${id}`);
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-email`, { params: { email } });
  }

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    this.http.post(`${this.baseUrl}/logout`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    localStorage.removeItem('loggedInUser');
  }
}
