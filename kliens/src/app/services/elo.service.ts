import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EloService {
  private url = 'http://localhost:3000';

  private uzenetekSubject = new BehaviorSubject<any[]>([]);
  uzenetek$ = this.uzenetekSubject.asObservable();

  private apiKey = 'AIzaSyD399Pb6YebmjeW7lJcUSM_rG3fA2pjgXE';
  private channelId = 'UCtpmd1UDP0W9MOwtsClRBkw';
  
  constructor( private http: HttpClient, private router: Router ) {}

  getElo(): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.channelId}&type=video&eventType=live&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getVideoUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&controls=1&showinfo=0&rel=0&iv_load_policy=3&fs=1`;
  }

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

  deleteMessages(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.http.delete<any>(`${this.url}/chat`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      tap(() => {
        this.uzenetekSubject.next([]);
      })
    );
  }
}
