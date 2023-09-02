import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private adminCredentials = {
    username: 'admin', // Replace with your admin username
    password: 'admin123' // Replace with your admin password
  };

  constructor() {}

  authenticateAdmin(username: string, password: string): Observable<boolean> {
    if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
      // Simulate successful authentication
      return of(true);
    } else {
      // Simulate failed authentication
      return of(false);
    }
  }
}
