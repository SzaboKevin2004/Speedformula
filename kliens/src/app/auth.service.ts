import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  pfp_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl= 'http://localhost:6969/regist';
  private felhBejelentkezettE = new BehaviorSubject<boolean>(false);
  felhBejelentkezettE$ = this.felhBejelentkezettE.asObservable();

  private randomKep = new BehaviorSubject<string>("");
  randomKep$ = this.randomKep.asObservable();

  private pfp_id: number = 0;

  private kepEleres = [
    "pfp_black.png",
    "pfp_grey.png",
    "pfp_green.png",
    "pfp_dark-green.png",
    "pfp_blue.png",
    "pfp_dark-blue.png",
    "pfp_pink.png",
    "pfp_dark-pink.png",
    "pfp_magenta.png",
    "pfp_dark-magenta.png",
    "pfp_yellow.png",
    "pfp_dark-yellow.png",
    "pfp_brown.png",
    "pfp_dark-brown.png",
    "pfp_cyan.png",
    "pfp_dark-cyan.png",
    "pfp_orange.png",
    "pfp_dark-orange.png",
    "pfp_purple.png",
    "pfp_dark-purple.png",
    "pfp_red.png",
    "pfp_dark-red.png"
  ];

  getKepEleresLength(): number {
    return this.kepEleres.length;
  }

  constructor(private http: HttpClient, private router: Router) {}
  
  setPfpId(pfpId: number) {
    this.pfp_id = pfpId;
    this.randomKep.next(this.kepEleres[this.pfp_id]);
  }

  getPfpId() {
    return this.pfp_id;
  }

  setBejelentkezettE(allapot: boolean) {
    this.felhBejelentkezettE.next(allapot);
  }

  regisztracio(regisztracioData: { first_name: string, last_name: string, username: string, email: string, password: string, confirmPassword: string, pfp_id: number}) {
    return this.http.post(`${this.apiUrl}/register`, regisztracioData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  

  bejelentkezes(loginData: { identifier: string, password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  kijelentkezes() {
    localStorage.removeItem('token');
    this.felhBejelentkezettE.next(false);
    this.router.navigate(['/']);
  }
}
