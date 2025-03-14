// Poszt létrehozás oldal viselkedéséért, működéséért felelős ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-forum-poszt',
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './forum-poszt.component.html',
    styleUrl: './forum-poszt.component.css'
})
export class ForumPosztComponent implements OnInit {
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';
  sotet: boolean = true;
  vilagos: boolean = false;
  voros: boolean = false;

  letrehoz: boolean = true;
  cikk: boolean = true;
  media: boolean = false;
  fajlNev: string | undefined = undefined;

  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';

  cim: string = "";
  szoveg: string | null = null;
  kep: string | null = null;
  video: string | null = null;

  constructor(private authservice: AuthService, private forumservice: ForumService, private router: Router) {}

  // A kiválasztott fájlt eltárolja fajl változóban
  fajlKivalasztva(esemeny: any) {
    const fajl = esemeny.target.files[0];

    // engedelyezettTipusok tömbben eltárolja azokat a fájl kiterjesztéseket, amiknek a feltöltése engedélyezett a weboldalon
    if (fajl) {
        const engedelyezettTipusok = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg+xml',
          'image/bmp',
          'image/tiff',
          'image/x-icon',
          'image/heif',
          'image/heic',
          'video/mp4',
          'video/webm',
          'video/ogg',
          'video/x-msvideo',   // AVI
          'video/quicktime',   // MOV
          'video/x-matroska',  // MKV
          'video/x-ms-wmv',    // WMV
          'video/x-flv',       // FLV
          'video/mpeg',        // MPEG
          'video/3gpp',        // 3GP
          'video/mp2t',        // TS
          'video/dvd'          // VOB
        ];

        // Ha a feltölteni kívánt fájl típusa nem egyezik meg az engedélyezett típusokkal, hiba üzenetet küld vissza a felhasználónak és kilép returnnel
        if (!engedelyezettTipusok.includes(fajl.type)) {
            alert('Csak képeket és videókat tölthetsz fel!');
            return;
        }
        // Ha engedélyezett típusba tartozik, akkor a fájlnevét elmenti a fajlNev változóba
        this.fajlNev = fajl.name;
    }
  }

  // Ez a függvény akkor hívódik meg, amikor egy fájlt a feltöltő terület fölé húznak. Megakadályozza az alapértelmezett eseménykezelést és esemény továbbterjedést
  // Illetve egy CSS osztályt ad hozzá hogy vizuális visszajelzést adjon így a felhasználónak
  huzEsTart(esemeny: DragEvent) {
    esemeny.preventDefault();
    esemeny.stopPropagation();
    (esemeny.currentTarget as HTMLElement).classList.add('huzas-folytatodik');
  }

  // Amint nem húzza a felhasználó a fájlt, eltávolítja róla az "effektet"
  huzasVege() {
    document.querySelector('.feltolto-doboz')?.classList.remove('huzas-folytatodik');
  }

  // Fájlkezelés. Amelyik fájlt a felhasználó hozzáaadja a "fajlok"-hoz a dataTransfer-el, majd megvizsgálja a hogy van-e legalább egy fájl benne. Aztán a első fájl nevét elmenti a fajlNev változóba
  fajlLedobva(esemeny: DragEvent) {
    esemeny.preventDefault();
    esemeny.stopPropagation();

    const fajlok = esemeny.dataTransfer?.files;
    if (fajlok && fajlok.length > 0) {
        this.fajlNev = fajlok[0].name;
    }
  }

  // Ez a metódus segít abban hogy a felhasználó a poszt létrehozásnál cikk létrehozást jelenítse meg
  cikkClick() {
    this.cikk = true;
    this.media = false;

    this.cim = '';
    this.szoveg = null;
    this.kep = null;
    this.video = null;
    this.fajlNev = undefined;
  }

   // Ez a metódus segít abban hogy a felhasználó a poszt létrehozásnál kép/videó létrehozást jelenítse meg. (Jelenleg fejlesztés alatt)!
   /*
  mediaClick() {
    this.cikk = false;
    this.media = true;

    this.cim = '';
    this.szoveg = null;
    this.kep = null;
    this.video = null;
    this.fajlNev = undefined;
  }
  */  
  mediaClick(){
    alert("Ez a funkció jelenleg fejlesztés alatt áll!");
  }
  // Poszt mentése
  mentes() {
    this.hiba = false;
    this.hibaUzenet = '';
    
    // Adatok objektumba helyezi, a poszthoz tartozó adatokat, amit majd kérés küldésénél továbbít
    const adatok = {
      cim: this.cim,
      szoveg: this.szoveg,
      kep: this.kep,
      video: this.video
    }
    // Poszt adatainak és kérésnek elküldése a forumService-n át a backendnek. Sikeres küldés/kérés esetén Létrejön a poszt, majd visszairányítja a felhasználót a fórum főoldalra. Hiba esetén kiírja a hibaüzenetet
    this.forumservice.createPost( adatok
    ).subscribe({
      next: (response) => {
        //console.log('Sikeres poszt létrehozás:', response);
        this.letrehoz = false;
        this.siker = true;
        this.sikerUzenet = "Poszt létrehozva!";
        setTimeout(() => {
          this.router.navigate(['/forum']);
        }, 1500);
      },
      error: (err) => {
        this.hiba = true;
        if (err.error?.message) {
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = "Ismeretlen hiba történt a poszt létrehozása során!";
        }
      }
    });
  }

  ngOnInit() {

    // téma beállítás
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
