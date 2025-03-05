import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { ForumService } from '../services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-profil',
    imports: [CommonModule, RouterModule],
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';
  sotet: boolean = false;
  vilagos: boolean = true;
  voros: boolean = false;

  felhasznaloNev: string = '';
  felhasznaloKep: string = '';
  vanFelhasznalo: boolean = false;
  bemutatkozas: string = '';

  posztok: any[] = [];

  kedveles: boolean = true;
  kikedveles: boolean = false;

  szerep: number = 2;

  bejegyzesKepcim: boolean = true;
  kommentKepcim: boolean = false;
  mentveKepcim: boolean = false;

  constructor(
    private authservice: AuthService, 
    private forumservice: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  vissza(){
    this.location.back();
  }

  profilBetoltes(): void {
    const url = window.location.href;
    const kuldottFelhasznalonev = this.felhasznalonevUrlbol(url);

    this.forumservice.profilLekeresMasik(kuldottFelhasznalonev).subscribe(
      (profil) => {
        this.felhasznaloNev = profil.másikfelhasználó.felhasznalonev;
        this.felhasznaloKep = profil.másikfelhasználó.kep;
        this.bemutatkozas = profil.másikfelhasználó.magamrol;
        this.vanFelhasznalo = true;
      },
      (error) => {
        if (error.status === 404) {
          console.warn("Felhasználó nem található, visszalépés az előző oldalra...");
          this.location.back();
        } else {
          console.error("Hiba történt:", error);
        }
      }
    )
  }

  posztBetoltes(): void {
    const url = window.location.href;
    const kuldottFelhasznalonev = this.felhasznalonevUrlbol(url);

    this.forumservice.getPostsId(kuldottFelhasznalonev).subscribe(
      (response) => {
        this.posztok = response.map((poszt: any) => ({
          ...poszt,
          elteltIdo: this.elteltIdoSzamitasa(poszt.elkuldve),
          sajatFelhasznalo: poszt.felhasznalo === this.felhasznaloNev
        }));
        console.log(this.posztok);
      },
      (error) => {
        if (error.status === 404) {
          console.warn("Felhasználó nem található, visszalépés az előző oldalra...");
          this.location.back();
        } else {
          console.error("Hiba történt:", error);
        }
      }
    )
  }

  elteltIdoSzamitasa(datum: string): string {
    const posztDatum = new Date(datum);
    const jelenleg = new Date();
    const masodpercekben = Math.floor((jelenleg.getTime() - posztDatum.getTime()) / 1000);

    if (masodpercekben < 60) {
      return `${masodpercekben} másodperce`;

    } else if (masodpercekben < 3600) {
      return `${Math.floor(masodpercekben / 60)} perce`;

    } else if (masodpercekben < 86400) {
      return `${Math.floor(masodpercekben / 3600)} órája`;

    } else if (masodpercekben < 2592000) {
      return `${Math.floor(masodpercekben / 86400)} napja`;

    } else if (masodpercekben < 31536000) {
      return `${Math.floor(masodpercekben / 2592000)} hónapja`;

    } else {
      return `${Math.floor(masodpercekben / 31536000)} éve`;
    }
  }


  felhasznalonevUrlbol(url: string): string {
    const regex = /forum\/profil\/([a-zA-Z0-9áéíóöőúüÁÉÍÓÖŐÚÜ-]+)/;
    const match = url.match(regex);
    
    if (match) {
        return match[1];
    } else {
        console.error('Szöveg nem található az URL-ben');
        return '';
    }
  }

  posztTorles(postId: number){
    console.log(postId);
    this.forumservice.deletePost(postId).subscribe(
      (response) => {
        console.log('Poszt sikeresen törölve:', response);
        this.posztBetoltes();
      },
      (error) => {
        console.error('Hiba történt a poszt törlésénél:', error);
      }
    );
  }
  bejegyzesekClick(){
    this.bejegyzesKepcim = true;
    this.kommentKepcim = false;
    this.mentveKepcim = false;
  }

  kommentekClick(){
    this.bejegyzesKepcim = false;
    this.kommentKepcim = true;
    this.mentveKepcim = false;
  }

  mentveClick(){
    this.bejegyzesKepcim = false;
    this.kommentKepcim = false;
    this.mentveKepcim = true;
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.profilBetoltes();
      this.posztBetoltes();
    });
    

    this.authservice.szamSzin$.subscribe( szam => {
      if(szam === 1){
        this.sotet = true;
        this.vilagos = false;
        this.voros = false;
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.temaSzinGordulo = 'feketeG';
      }
      else if(szam === 2){
        this.sotet = false;
        this.vilagos = true;
        this.voros = false;
        this.temaSzin = 'feherK';
        this.temaSzin2 = 'feherK2';
        this.temaSzinN = 'feherN';
        this.temaSzinBetu = 'feherBetu';
        this.temaSzinHover = 'feherH'
        this.temaSzinGordulo = 'feherG';
      }
      else if(szam === 3){
        this.sotet = false;
        this.vilagos = false;
        this.voros = true;
        this.temaSzin = 'vorosK';
        this.temaSzin2 = 'vorosK2';
        this.temaSzinN = 'vorosN';
        this.temaSzinBetu = 'vorosBetu';
        this.temaSzinHover = 'vorosH';
        this.temaSzinGordulo = 'vorosG';
      }else{
        this.sotet = true;
        this.vilagos = false;
        this.voros = false;
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.temaSzinGordulo = 'feketeG';
      };
    });
  }
}