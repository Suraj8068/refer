import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5274/api/User'; 

  constructor(private http: HttpClient) {}


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllUsers`, {
      headers: this.getAuthHeaders()
    });
  }


  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, user, {
      headers: this.getAuthHeaders()
    });
  }
  
  getOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Organization`, { headers: this.getAuthHeaders() });
  }

  // ✅ Common headers function
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  updateUser(updatedUser: any) {
    const headers = this.getAuthHeaders().set('Content-Type', 'application/json');
  
    console.log("🔹 Sending Headers:", headers); 
    console.log("🔹 Token in Local Storage:", localStorage.getItem('token'));
  
    return this.http.put(`${this.apiUrl}/${updatedUser.UserId}`, updatedUser, { headers });
  }
  
  
  
  
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
