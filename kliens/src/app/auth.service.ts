import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
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

  constructor(private http: HttpClient, private router: Router) {}

  regisztracio(regisztracioData: { first_name: string, last_name: string, username: string, email: string, password: string, confirmPassword: string }) {
    const randomKepSzam = Math.floor(Math.random() * this.kepEleres.length);
    const randomKep = this.kepEleres[randomKepSzam];
    this.randomKep.next(randomKep);
    console.log(randomKep);
  
 
    this.http.post(`${this.apiUrl}/register`, regisztracioData).subscribe(response => {
      console.log('Regisztráció sikeres', response);
      this.router.navigate(['/bejelentkezes']);

    }, error => {
      console.error('Hiba történt a regisztráció során', error);
    });
  }
  

  bejelentkezes(loginData: { identifier: string, password: string }) {

    this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData).subscribe((response) => {

      localStorage.setItem('token', response.token);

      this.felhBejelentkezettE.next(true);
      this.router.navigate(['/']);
    }, error => {
      console.error('Hiba történt a bejelentkezés során', error);
    });
  }

  kijelentkezes() {
    localStorage.removeItem('token');
    this.felhBejelentkezettE.next(false);
    this.router.navigate(['/']);
  }
}
