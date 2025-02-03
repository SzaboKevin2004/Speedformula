import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  pfp: number;
  username: string;
  tema: number;
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

  private szamSzin = new BehaviorSubject<number>(1); 
  szamSzin$ = this.szamSzin.asObservable();

  private uzenetekSubject = new BehaviorSubject<any[]>([]);
  uzenetek$ = this.uzenetekSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const pfp = localStorage.getItem('pfp');
      const username = localStorage.getItem('username');
      const tema = localStorage.getItem('tema');

      if (token) {
        this.felhBejelentkezettE.next(true);
      }

      if (pfp) {
        this.randomKep.next(this.kepEleres[parseInt(pfp)]);
      }

      if (username) {
        this.felhasznaloNev.next(username);
      }

      if (tema) {
        this.szamSzin.next(parseInt(tema));
      }
    }
  }

  regisztracio(regisztracioData: { felhasznalonev: string, email: string, password: string, confirm_password: string, kep: number }) {
    return this.http.post(`${this.url}/regist`, regisztracioData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  bejelentkezes(loginData: { felhasznalonev: string, email: string, password: string }) {
    return this.http.post<AuthResponse>(`${this.url}/login`, loginData).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      tap((response) => {
        this.setTheme(response.tema);
        this.setToken(response.token);
        this.setPfpId(response.pfp);
        this.setFelhasznaloNev(response.username);
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

  setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
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

  setBejelentkezettE(allapot: boolean) {
    this.felhBejelentkezettE.next(allapot);
  }

  setPfpId(pfp: number) {
    this.randomKep.next(this.kepEleres[pfp]);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pfp', pfp.toString());
    }
  }

  setFelhasznaloNev(nev: string) {
    this.felhasznaloNev.next(nev);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('username', nev);
    }
  }

  setTheme(tema: number) {
    this.szamSzin.next(tema);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('tema', tema.toString());
    }
  }

  kijelentkezes() {
    if (typeof window !== 'undefined' && window.localStorage) {
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

  getKepEleres() {
    return this.kepEleres;
  }
}
