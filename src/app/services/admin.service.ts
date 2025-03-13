import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = 'http://localhost:5274/api/UserPermission';

  constructor(private http: HttpClient) {}

  getAdminList() {
    return this.http.get(`${this.apiUrl}/GetAdminList`);
  }

  assignPermission(updatedPermissions: any[]): Observable<any> {  // ✅ Type argument added
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('Error: No token found!');
      return new Observable<any>();  // ✅ Return an empty observable to avoid errors
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    });
  
    return this.http.post<any>(`${this.apiUrl}/AssignPermission`, updatedPermissions, { headers });
  }
}
