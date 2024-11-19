import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Division } from '../../models/csmis-Division';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  private apiUrl = 'http://localhost:8081/api/divisions';  // Base URL of your backend API

  constructor(private http: HttpClient) { }

  getDivisionById(id: number): Observable<Division> {
    return this.http.get<Division>(`${this.apiUrl}/showbyDivisionid/${id}`);
  }
}
