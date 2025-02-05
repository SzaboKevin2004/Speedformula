import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-beallitasok',
    imports: [RouterModule, CommonModule, FormsModule],
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

  lekertFelhasznalonev: string = '';
  lekertEmail: string = '';
  lekertPassword: string = '';
  lekertTema_id: number = -1;
  lekertKep: number = -1;

  felhasznalonev: string | undefined = undefined;
  email: string | undefined = undefined;
  password: string | undefined = undefined;
  tema_id: number | undefined = undefined;
  kep: number | undefined = undefined;

  ujEmail: string | undefined = undefined;
  ujPassword: string | undefined = undefined;
  ujraPassword: string | undefined = undefined;
  ujFelhasznalonev: string | undefined = undefined;
  modositasNyitvaE: boolean = false;
  modositasCim: string = '';
  modositasPlaceHolder: string = '';
  fiokTorlesNyitvaE: boolean = false;

  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';

  constructor(private authservice: AuthService, private router: Router) {}


  megnyitModositas(modositasTipus: string) {
    this.modositasNyitvaE = true;

    if (modositasTipus === 'email') {
      this.modositasCim = 'E-mail cím módosítása';
      this.modositasPlaceHolder = 'Új email cím';

    } else if (modositasTipus === 'password') {
      this.modositasCim = 'Jelszó módosítása';
      this.modositasPlaceHolder = 'Új jelszó';

    } else if (modositasTipus === 'username') {
      this.modositasCim = 'Felhasználónév módosítása';
      this.modositasPlaceHolder = 'Új felhasználónév';
    }
  }

  megnyitFiokTorles() {
    this.fiokTorlesNyitvaE = true;
  }

  torlesFiok() {
    this.authservice.profilTorles().subscribe({
      next: (response) => {
        this.siker = true;
        this.sikerUzenet = 'Sikeres fiók törlés!';
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('pfp');
          localStorage.removeItem('username');
          localStorage.removeItem('tema');
          this.authservice.setBejelentkezettE(false);
          this.router.navigate(['/']);
          this.siker = false;
          this.sikerUzenet = '';
        }, 1000);
      },
      error: (err) => {
        this.hiba = true;
        if (err.error?.message){
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = 'Ismeretlen hiba történt!';
        }
      }
    });
    this.bezarModositas();
  }

  bezarModositas() {
    this.modositasNyitvaE = false;
    this.fiokTorlesNyitvaE = false;
    this.ujEmail = undefined;
    this.ujPassword = undefined;
    this.ujraPassword = undefined;
    this.ujFelhasznalonev = undefined;
    this.hiba = false;
    this.hibaUzenet = '';
  }

  mentesModositas() {
    this.hiba = false;
    this.hibaUzenet = '';
    this.siker = false;
    this.sikerUzenet = '';

    const profilData = {
      felhasznalonev : this.ujFelhasznalonev,
      email : this.ujEmail,
      password : this.ujPassword,
      tema_id : undefined,
      kep: undefined
    }

    if (this.modositasCim.includes('Jelszó')) {
      if (this.ujPassword !== this.ujraPassword) {
        this.hiba = false;

        setTimeout(() => {
          this.hiba = true;
        }, 5);
        this.hibaUzenet = 'A két jelszó nem egyezik meg!';
        return;
      }
    }

    this.authservice.profilModositas(
      profilData.felhasznalonev,
      profilData.email,
      profilData.password, 
      profilData.tema_id,
      profilData.kep
    ).subscribe({
      next: () => {
        if( profilData.felhasznalonev !== undefined){
          this.authservice.setFelhasznaloNev(profilData.felhasznalonev)
        }
        this.modositasNyitvaE = false;
        this.fiokTorlesNyitvaE = false;
        this.ujEmail = undefined;
        this.ujPassword = undefined;
        this.ujraPassword = undefined;
        this.ujFelhasznalonev = undefined;
        this.hiba = false;
        this.hibaUzenet = '';
        this.siker = true;
        this.sikerUzenet = 'Sikeres módosítás!';
        setTimeout(() => {
          this.profilLekeres();
          this.siker = false;
          this.sikerUzenet = '';
        }, 1000);
      },
      error: (err) => {
        this.hiba = true;
        if (err.error?.message){
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = 'Ismeretlen hiba történt!';
        }
      }
    });
    console.log(profilData)
    
  }

  temaModositas() {
    const profilData = {
      felhasznalonev : undefined,
      email : undefined,
      password : undefined,
      tema_id : this.tema_id,
      kep: undefined
    }

    if(this.tema_id != -1){
      this.authservice.profilModositas(
        profilData.felhasznalonev,
        profilData.email,
        profilData.password, 
        profilData.tema_id,
      ).subscribe({
        next: (response) => {
          console.log('Sikeres módosítás:', response);
        },
        error: (error) => {
          this.hiba = true;
          console.error('Hiba történt a profil módosításakor:', error);
        }
      });
    }
  }

  profilLekeres() {
    this.authservice.profilLekeres().subscribe({
      next: (response) => {
        const profilAdatok = response.felhasználó;
        this.lekertFelhasznalonev = profilAdatok.felhasznalonev;
        this.lekertEmail = profilAdatok.email;
        this.lekertPassword = profilAdatok.password;
        this.lekertTema_id = profilAdatok.tema_id;
        this.lekertKep = profilAdatok.kep;
        console.log(profilAdatok)
      },
      error: (error) => {
        console.error('Hiba történt a profil lekérésénél:', error);
      }
    })
  }

  ngOnInit() {

    this.profilLekeres();

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
