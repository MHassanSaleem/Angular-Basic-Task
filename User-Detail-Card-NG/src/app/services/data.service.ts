// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>('https://gorest.co.in/public/v2/users');
  }

  // Fetch posts for a specific user
  getUserPosts(Id: number): Observable<any> {
    const url = `https://gorest.co.in/public/v2/users/${Id}/posts`;
    return this.http.get(url);
  }


  getUserDetails(Id: number): Observable<any> {
    const url = `https://gorest.co.in/public/v2/users/${Id}`;
    return this.http.get<any[]>(url);
  }

}
