import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  pfp: string;
  username: string;
  tema: number;
  szerep: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000';
  private felhBejelentkezettE = new BehaviorSubject<boolean>(false);
  felhBejelentkezettE$ = this.felhBejelentkezettE.asObservable();

  private randomKep = new BehaviorSubject<string>(""); 
  randomKep$ = this.randomKep.asObservable();

  private felhasznaloNev = new BehaviorSubject<string>(""); 
  felhasznaloNev$ = this.felhasznaloNev.asObservable();

  private szamSzin = new BehaviorSubject<number>(2); 
  szamSzin$ = this.szamSzin.asObservable();

  private szerep = new BehaviorSubject<number>(2);
  szerep$ = this.szerep.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const pfp = localStorage.getItem('pfp');
      const username = localStorage.getItem('username');
      const tema = localStorage.getItem('tema');
      const szerep = localStorage.getItem('szerep');

      if (token) {
        this.felhBejelentkezettE.next(true);
      }

      if (pfp) {
        this.randomKep.next(pfp);
      }

      if (username) {
        this.felhasznaloNev.next(username);
      }

      if (tema) {
        this.szamSzin.next(parseInt(tema));
      }

      if (szerep) {
        this.szerep.next(parseInt(szerep));
      }
    }
  }

  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }

  setBejelentkezettE(allapot: boolean) {
    this.felhBejelentkezettE.next(allapot);
  }

  getBejelentkezettE() {
    this.felhBejelentkezettE;
  }

  setPfpId(pfp: string) {
    this.randomKep.next(pfp);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pfp', pfp);
    }
  }

  setFelhasznaloNev(nev: string | undefined = '' ) {
    this.felhasznaloNev.next(nev);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('username', nev);
    }
  }

  setEmail(email: string) {
    if (typeof window!== 'undefined' && window.localStorage) {
      localStorage.setItem('email', email);
    }
  }

  setTheme(tema: number) {
    this.szamSzin.next(tema);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('tema', tema.toString());
    }
  }

  setSzerep(szerep: number) {
    this.szerep.next(szerep);
    if (typeof window!== 'undefined' && window.localStorage) {
      localStorage.setItem('szerep', szerep.toString());
    }
  }

  regisztracio(regisztracioData: {
    felhasznalonev: string,
    email: string,password: string,
    confirm_password: string,
  }) {
    return this.http.post(`${this.url}/regist`, regisztracioData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  bejelentkezes(loginData: {
    felhasznalonev: string,
    email: string,
    password: string 
  }) {
    return this.http.post<AuthResponse>(`${this.url}/login`, loginData).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      tap((response) => {
        this.setTheme(response.tema);
        this.setToken(response.token);
        this.setPfpId(response.pfp);
        this.setFelhasznaloNev(response.username);
        this.setSzerep(response.szerep);
      })
    );
  }

  profilLekeres() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Nincs bejelentkezett felhasználó!');
    }
    return this.http.get<any>(`${this.url}/profil`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  profilModositas(
    felhasznalonev: string | undefined = undefined,
    email: string | undefined = undefined,
    password: string | undefined = undefined,
    tema_id: number | undefined = undefined,
    kep: number | undefined = undefined
  ) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Nincs bejelentkezett felhasználó!');
    }

    return this.http.patch(`${this.url}/profil`, 
      { felhasznalonev, email, password, tema_id, kep }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }).pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  profilTorles(){
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Nincs bejelentkezett felhasználó!');
    }
  
    return this.http.delete(`${this.url}/profil`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  kijelentkezes() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('szerep');
      localStorage.removeItem('token');
      localStorage.removeItem('pfp');
      localStorage.removeItem('username');
      localStorage.removeItem('tema');
    }
    window.location.reload();
    this.felhBejelentkezettE.next(false);
    this.router.navigate(['/']);
  }

  hitelesitettE(): boolean {
    return !!localStorage.getItem('token');
  }

  getKepEleres() {
    return this.kepEleres;
  }

  private kepEleres = [
    "../assets/pfp/pfp_black.png",
    "../assets/pfp/pfp_grey.png",
    "../assets/pfp/pfp_green.png",
    "../assets/pfp/pfp_dark-green.png",
    "../assets/pfp/pfp_blue.png",
    "../assets/pfp/pfp_dark-blue.png",
    "../assets/pfp/pfp_pink.png",
    "../assets/pfp/pfp_dark-pink.png",
    "../assets/pfp/pfp_magenta.png",
    "../assets/pfp/pfp_dark-magenta.png",
    "../assets/pfp/pfp_yellow.png",
    "../assets/pfp/pfp_dark-yellow.png",
    "../assets/pfp/pfp_brown.png",
    "../assets/pfp/pfp_dark-brown.png",
    "../assets/pfp/pfp_cyan.png",
    "../assets/pfp/pfp_dark-cyan.png",
    "../assets/pfp/pfp_orange.png",
    "../assets/pfp/pfp_dark-orange.png",
    "../assets/pfp/pfp_purple.png",
    "../assets/pfp/pfp_dark-purple.png",
    "../assets/pfp/pfp_red.png",
    "../assets/pfp/pfp_dark-red.png"
  ];
}
