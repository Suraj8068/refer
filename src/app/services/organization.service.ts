import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = 'http://localhost:5274/api/Organization';

  constructor(private http: HttpClient) {}

  // ✅ Get Organizations
  getOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  // ✅ Add Organization
  addOrganization(org: any): Observable<any> {
    return this.http.post(this.baseUrl, org, { headers: this.getHeaders() });
  }

  // ✅ Update Organization
  updateOrganization(id: number, org: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, org, { headers: this.getHeaders() });
  }

  // ✅ Delete Organization
  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  // ✅ Common function to add Authorization header
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
