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

  fajlKivalasztva(esemeny: any) {
    const fajl = esemeny.target.files[0];

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

        if (!engedelyezettTipusok.includes(fajl.type)) {
            alert('Csak képeket és videókat tölthetsz fel!');
            return;
        }

        this.fajlNev = fajl.name;
    }
  }

  huzEsTart(esemeny: DragEvent) {
    esemeny.preventDefault();
    esemeny.stopPropagation();
    (esemeny.currentTarget as HTMLElement).classList.add('huzas-folytatodik');
  }

  huzasVege() {
    document.querySelector('.feltolto-doboz')?.classList.remove('huzas-folytatodik');
  }

  fajlLedobva(esemeny: DragEvent) {
    esemeny.preventDefault();
    esemeny.stopPropagation();

    const fajlok = esemeny.dataTransfer?.files;
    if (fajlok && fajlok.length > 0) {
        this.fajlNev = fajlok[0].name;
    }
  }

  cikkClick() {
    this.cikk = true;
    this.media = false;

    this.cim = '';
    this.szoveg = null;
    this.kep = null;
    this.video = null;
    this.fajlNev = undefined;
  }

  mediaClick() {
    this.cikk = false;
    this.media = true;

    this.cim = '';
    this.szoveg = null;
    this.kep = null;
    this.video = null;
    this.fajlNev = undefined;
  }

  bezar() {}

  mentes() {
    this.hiba = false;
    this.hibaUzenet = '';
    
    const adatok = {
      cim: this.cim,
      szoveg: this.szoveg,
      kep: this.kep,
      video: this.video
    }
    this.forumservice.createPost( adatok
    ).subscribe({
      next: (response) => {
        console.log('Sikeres poszt létrehozás:', response);
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
