//Profil oldal viselkedéséért, működéséért felelős ts
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

  sajatFelhaznaloNev: string = '';

  constructor(
    private authservice: AuthService, 
    private forumservice: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  // Vissza gomb, mely visszairányít az előző oldalra
  vissza(){
    this.location.back();
  }


  // Profil betöltés
  profilBetoltes(): void {
    // Metódusból az adott profil oldal url-éből kinyert felhasználónevének változóban tárolása
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

  // Posztok betöltése
  posztBetoltes(): void {
    // Metódusból az adott profil oldal url-éből kinyert felhasználónevének változóban tárolása
    const url = window.location.href;
    const kuldottFelhasznalonev = this.felhasznalonevUrlbol(url);

    this.forumservice.getPostsId(kuldottFelhasznalonev).subscribe(
      (response) => {
        this.posztok = response.map((poszt: any) => ({
          ...poszt,
          // Elteltidő tárolása
          elteltIdo: this.elteltIdoSzamitasa(poszt.elkuldve),
          // Megvizsgálja felhasználónév egyezés alapján hogy a bejelentkezett felhasználóhoz tartozik-e az adott poszt. Ennek logikai értékét a "sajatFelhasznalo" váltózóban tárolja el.
          sajatFelhasznalo: poszt.felhasznalo === this.sajatFelhaznaloNev
        }));
        //console.log(this.felhasznaloNev);
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

  // Profil lekérése, a kapott lekérésből eltároljuk változókban a felhasználónevet és a szerepet (normál felhasználó, admin felhasználó )
  profilLekeres() {
    this.authservice.profilLekeres().subscribe({
      next: (response) => {
        this.sajatFelhaznaloNev = response.felhasználó.felhasznalonev;
        this.szerep = response.felhasználó.szerep_id;
      },
      error: (error) => {
        console.error('Hiba történt a profil lekérésénél:', error);
      }
    })
  }

  // Itt kerül kiszámolásra hogy az adott poszt mennyi ideje lett létrehozva, mely a jelenlegi idő és a létrehozás idejéből számolva kerül meghatározásra benne
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


  // Felhasználónév kinyerés URL-ből
  felhasznalonevUrlbol(url: string): string {
    const regex = /forum\/profil\/([a-zA-ZáÁéÉíÍóÓöÖőŐúÚüÜűŰa-zA-Z0-9_.-]+)/;
    const match = url.match(regex);
    
    if (match) {
        return match[1];
    } else {
        console.error('Szöveg nem található az URL-ben');
        return '';
    }
  }

  // Poszt törlés poszt id (azonosító) alapján
  posztTorles(postId: number){
    //console.log(postId);
    //console.log(this.szerep);
    this.forumservice.deletePost(postId).subscribe(
      (response) => {
        //console.log('Poszt sikeresen törölve:', response);
        this.posztBetoltes();
      },
      (error) => {
        console.error('Hiba történt a poszt törlésénél:', error);
      }
    );
  }

  // Profil törlés felhasználónév alapján (A felhasználónév küldésre kerül, majd ha létezik ilyen felhasználónév akkor törlésre kerül a felhasználó, majd visszairányítja az admin a fórum főoldalára)
  profilTorles(felhasznalonev: string){
    //console.log(felhasznalonev);
    this.authservice.profilMasikTorles(felhasznalonev).subscribe(
      (response) => {
        //console.log('Felhasználó sikeresen törölve:', response);
        this.router.navigate(['/forum']);
      },
      (error) => {
        console.error('Hiba történt a felhasználó törlésénél:', error);
      }
    );
  }
  // Bejegyzések gombra kattintva a bejegyzéseket jeleníti meg
  bejegyzesekClick(){
    this.bejegyzesKepcim = true;
    this.kommentKepcim = false;
    this.mentveKepcim = false;
  }

  // Komment gombra kattintva a kommenteket jeleníti meg (fejlesztés alatt)
  kommentekClick(){
    this.bejegyzesKepcim = false;
    this.kommentKepcim = true;
    this.mentveKepcim = false;
  }

  // Mentve gombra kattintva a mentett tartalmakat jeleníti meg (fejlesztés alatt)
  mentveClick(){
    this.bejegyzesKepcim = false;
    this.kommentKepcim = false;
    this.mentveKepcim = true;
  }

  // Metódusok betöltése
  ngOnInit() {
    this.route.params.subscribe(() => {
      this.profilLekeres()
      this.profilBetoltes();
      this.posztBetoltes();
    });
    

    // Téma beállítás
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
