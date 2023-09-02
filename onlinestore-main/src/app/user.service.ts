// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataUrl = 'http://localhost:3000/users'; // Update the URL accordingly

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any[]> {
    return this.http.get<any[]>(this.userDataUrl);
  }

  checkIfUserExists(username: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.userDataUrl}?username=${username}`)
      .pipe(
        map(response => response.length > 0)
      );
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any[]>(`${this.userDataUrl}?username=${username}`)
      .pipe(
        map(response => response[0])
      );
  }

  register(user: any): Observable<any> {
    // Make an HTTP POST request to add the user data to the JSON server
    return this.http.post(`${this.userDataUrl}`, user);
  }
  addUser(user: any): Observable<any> {
    // Make an HTTP POST request to add the user data to the JSON server
    return this.http.post(`${this.userDataUrl}`, user);
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.userDataUrl}/${userId}`;
    return this.http.delete(url);
  }
  editUser(editedUser: any): Observable<any> {
    return this.http.put(`${this.userDataUrl}/${editedUser.id}`, editedUser);
  }

  
  }


