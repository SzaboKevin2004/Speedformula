import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VisszajelzesService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  visszajelzes(visszajelzesData: {}) {
    return this.http.post(`${this.url}/visszajelzes`, visszajelzesData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  
}
