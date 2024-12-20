import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  pfp: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:6969/regist';
  private felhBejelentkezettE = new BehaviorSubject<boolean>(false);
  felhBejelentkezettE$ = this.felhBejelentkezettE.asObservable();

  private randomKep = new BehaviorSubject<string>("");
  randomKep$ = this.randomKep.asObservable();

  private felhasznaloNev = new BehaviorSubject<string>("");
  felhasznaloNev$ = this.felhasznaloNev.asObservable();

  hitelesitettE(): boolean {
    return !!localStorage.getItem('token');
  }

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

  constructor(private http: HttpClient, private router: Router) {

    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const pfpId = localStorage.getItem('pfpId');
      const username = localStorage.getItem('username');
      
      if (token) {
        this.felhBejelentkezettE.next(true);
      }

      if (pfpId) {
        this.randomKep.next(this.kepEleres[parseInt(pfpId)]);
      }

      if (username) {
        this.felhasznaloNev.next(username);
      }
    }
  }

  regisztracio(regisztracioData: { first_name: string, last_name: string, username: string, email: string, password: string, confirmPassword: string }) {
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

  setBejelentkezettE(allapot: boolean) {
    this.felhBejelentkezettE.next(allapot);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', allapot ? 'meglevoToken' : '');
    }
  }

  setPfpId(pfpId: number) {
    this.randomKep.next(this.kepEleres[pfpId]);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pfpId', pfpId.toString());
    }
  }

  setFelhasznaloNev(nev: string) {
    this.felhasznaloNev.next(nev);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('username', nev);
    }
  }

  kijelentkezes() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('pfpId');
      localStorage.removeItem('username');
    }
    this.felhBejelentkezettE.next(false);
    this.router.navigate(['/']);
  }
}
