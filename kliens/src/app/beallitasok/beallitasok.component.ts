import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-beallitasok',
    imports: [CommonModule],
    templateUrl: './beallitasok.component.html',
    styleUrl: './beallitasok.component.css'
})
export class BeallitasokComponent implements OnInit {
  fiok: boolean = true;
  profil: boolean = false;
  tema: boolean = false;
  vilagos: boolean = false;
  sotet: boolean = true;
  voros: boolean = false;
  teljesNev: boolean = true;
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  defKep: string = '';

  felhasznalonev: string | undefined = undefined;
  email: string | undefined = undefined;
  password: string | undefined = undefined;
  tema_id: number | undefined = undefined;
  kep: number | undefined = undefined;

  constructor(private authservice: AuthService) {}

  temaModositas() {
    const profilData = {
      felhasznalonev : this.felhasznalonev,
      email : this.email,
      password : this.password,
      tema_id : this.tema_id,
      kep: this.kep
    }

    if(this.tema_id != -1){
      this.authservice.profilModositas(
        profilData.felhasznalonev,
        profilData.email,
        profilData.password, 
        profilData.tema_id,
        profilData.kep
      ).subscribe({
        next: (response) => {
          console.log('Sikeres módosítás:', response);
        },
        error: (error) => {
          console.error('Hiba történt a profil módosításakor:', error);
        }
      });
    }
  }

  ngOnInit() {
    this.authservice.szamSzin$.subscribe( szam => {
      if( szam === 1){
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.vilagos = false;
        this.sotet = true;
        this.voros = false;
      }
      else if( szam === 2){
        this.temaSzin = 'feherK';
        this.temaSzin2 = 'feherK2';
        this.temaSzinN = 'feherN';
        this.temaSzinBetu = 'feherBetu';
        this.temaSzinHover = 'feherH';
        this.vilagos = true;
        this.sotet = false;
        this.voros = false;
      }
      else if( szam === 3){
        this.temaSzin = 'vorosK';
        this.temaSzin2 = 'vorosK2';
        this.temaSzinN = 'vorosN';
        this.temaSzinBetu = 'vorosBetu';
        this.temaSzinHover = 'vorosH';
        this.vilagos = false;
        this.sotet = false;
        this.voros = true;
      }else{
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.vilagos = false;
        this.sotet = true;
        this.voros = false;
      };
    });
  }

  fiokMegjelenites() {
    this.fiok = true;
    this.profil = false;
    this.tema = false;
  }
  profilMegjelenites() {
    this.fiok = false;
    this.profil = true;
    this.tema = false;
  }
  temaMegjelenites() {
    this.fiok = false;
    this.profil = false;
    this.tema = true;
  }

  vilagosMegjelenites() {
    this.vilagos = true;
    this.sotet = false;
    this.voros = false;
    this.authservice.setTheme(2);
    this.tema_id = 2;
  }

  sotetMegjelenites() {
    this.vilagos = false;
    this.sotet = true;
    this.voros = false;
    this.authservice.setTheme(1);
    this.tema_id = 1;
  }

  vorosMegjelenites() {
    this.vilagos = false;
    this.sotet = false;
    this.voros = true;
    this.authservice.setTheme(3);
    this.tema_id = 3;
  }

  teljesNevMegjelenites() {
    this.teljesNev = !this.teljesNev;
  }
}
