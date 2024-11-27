import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  constructor() {}

  regisztracio(){
    const randomKepSzam = Math.floor(Math.random() * this.kepEleres.length);
    const randomKep = this.kepEleres[randomKepSzam];
    this.randomKep.next(randomKep);
    console.log(randomKep);
  }

  bejelentkezes() {
    this.felhBejelentkezettE.next(true);
  }

  kijelentkezes() {
    this.felhBejelentkezettE.next(false);
  }
}