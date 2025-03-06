import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElochatService {
  private url = 'http://localhost:3000';

  private uzenetekSubject = new BehaviorSubject<any[]>([]);
  uzenetek$ = this.uzenetekSubject.asObservable();
  
  constructor( private http: HttpClient, private router: Router ) {}

  sendChatMessage(uzenet: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Nincs bejelentkezett felhasználó!');
    }

    return this.http.post(`${this.url}/chat`, 
      { uzenet }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }).pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
        tap(() => {
          this.getMessages(); 
        })
      );
  }

  getMessages(): Observable<any[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.http.get<any[]>(`${this.url}/chat`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      tap((messages) => {
        this.uzenetekSubject.next(messages);
      })
    );
  }
}
