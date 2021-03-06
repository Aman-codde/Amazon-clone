import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:string = 'http://localhost:3504/';
  constructor(private http: HttpClient) 
  { }

  get<T>(resourceName: string) {
    return this.http.get<T>(this.baseUrl + resourceName);
  }

  // data: User
  post<T,D>(resourceName: string, data: D) {
    return this.http.post<T>(this.baseUrl + resourceName, data);
  }

  delete<T>(resourceName: string) {
    return this.http.delete<T>(this.baseUrl + resourceName);
  }

  put<T,D>(resourceName: string, data: D) {
    return this.http.put<T>(this.baseUrl + resourceName, data);
  }
}
