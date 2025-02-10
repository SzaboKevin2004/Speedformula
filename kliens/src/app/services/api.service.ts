import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient) {}

    getNews(): Observable<any> {
      return this.http.get<any>(`${this.url}/hirek`);
    }
  
    getTeams(): Observable<any> {
      return this.http.get<any>(`${this.url}/csapatok`);
    }
}
