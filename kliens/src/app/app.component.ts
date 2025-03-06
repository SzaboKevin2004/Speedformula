import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navMegjelenites: boolean = true;
  bejelentkezesMegjelenites: boolean = true;
  profilMegjelenites: boolean = false;
  profilMenuMegjelenites: boolean = false;
  menuMegjelenites: boolean = false;
  randomKep: string = "";
  felhasznaloNev: string = "";
  sotet: boolean = true;
  vilagos: boolean = false;
  voros: boolean = false;
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';
  temaSzinHr: string = '';

  lekertFelhasznalonev: string = '';
  lekertEmail: string = '';
  lekertPassword: string = '';
  lekertTema_id: number = -1;
  lekertKep: number = -1;
  
  constructor(private router: Router, private authservice: AuthService) {}

  profilLekeres() {
    const randomSzam = Math.floor(Math.random() * (14 - 8 + 1)) +8;
    const csillagok = '*'.repeat(randomSzam);

    this.authservice.profilLekeres().subscribe({
      next: (response) => {
        const profilAdatok = response.felhasználó;
        this.lekertFelhasznalonev = profilAdatok.felhasznalonev;
        this.lekertEmail = profilAdatok.email;
        this.lekertPassword = csillagok;
        this.lekertTema_id = profilAdatok.tema_id;
        this.lekertKep = profilAdatok.kep;
      },
      error: (error) => {
        console.error('Hiba történt a profil lekérésénél:', error);
      }
    })
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const jelenlegiUrl = this.router.url;

      if (this.isFeherOldal()) {
        if (typeof document !== 'undefined') {
          document.body.className = 'feherBg';
        }
      } else {
        this.authservice.szamSzin$.subscribe(szam => {
          if (szam === 1) {
            this.sotet = true;
            this.vilagos = false;
            this.voros = false;
            this.temaSzin = 'feketeK';
            this.temaSzin2 = 'feketeK2';
            this.temaSzinN = 'feketeN';
            this.temaSzinBetu = 'feketeBetu';
            this.temaSzinHover = 'feketeH';
            this.temaSzinGordulo = 'feketeG';
            this.temaSzinHr = 'feketeHr';
            if (typeof document !== 'undefined') {
            document.body.className = 'feketeBg';
            }
          } else if (szam === 2) {
            this.sotet = false;
            this.vilagos = true;
            this.voros = false;
            this.temaSzin = 'feherK';
            this.temaSzin2 = 'feherK2';
            this.temaSzinN = 'feherN';
            this.temaSzinBetu = 'feherBetu';
            this.temaSzinHover = 'feherH';
            this.temaSzinGordulo = 'feherG';
            this.temaSzinHr = 'feherHr';
            if (typeof document !== 'undefined') {
              document.body.className = 'feherBg';
            }
          } else if (szam === 3) {
            this.sotet = false;
            this.vilagos = false;
            this.voros = true;
            this.temaSzin = 'vorosK';
            this.temaSzin2 = 'vorosK2';
            this.temaSzinN = 'vorosN';
            this.temaSzinBetu = 'vorosBetu';
            this.temaSzinHover = 'vorosH';
            this.temaSzinGordulo = 'vorosG';
            this.temaSzinHr = 'vorosHr';
            if (typeof document !== 'undefined') {
              document.body.className = 'vorosBg';
            }
          } else {
            this.sotet = true;
            this.vilagos = false;
            this.voros = false;
            this.temaSzin = 'feketeK';
            this.temaSzin2 = 'feketeK2';
            this.temaSzinN = 'feketeN';
            this.temaSzinBetu = 'feketeBetu';
            this.temaSzinHover = 'feketeH';
            this.temaSzinGordulo = 'feketeG';
            this.temaSzinHr = 'feketeHr';
            if (typeof document !== 'undefined') {
              document.body.className = 'feketeBg';
            }
          }
        });
      }
      this.navMegjelenites = !(jelenlegiUrl.includes('bejelentkezes') || 
      jelenlegiUrl.includes('regisztracio') || 
      jelenlegiUrl.includes('hiba') || 
      jelenlegiUrl.includes('visszajelzes'));
    });

    this.authservice.felhBejelentkezettE$.subscribe(bejelentkezettE => {
      this.bejelentkezesMegjelenites = !bejelentkezettE;
      this.profilMegjelenites = bejelentkezettE;
    });

    this.authservice.randomKep$.subscribe(kep => {
      this.randomKep = kep;
    });

    this.authservice.profilLekeres().subscribe();

    this.authservice.felhasznaloNev$.subscribe(nev => {
      this.felhasznaloNev = nev;
    });
  }

  isFeherOldal(): boolean {
    return this.router.url === '/visszajelzes' || 
    this.router.url === '/bejelentkezes' ||
    this.router.url === '/regisztracio' || 
    this.router.url === '/hiba';
  }

  profilMenu() {
    this.profilMenuMegjelenites = !this.profilMenuMegjelenites;

    if (this.menuMegjelenites) {
      this.menuMegjelenites = false;
    }
  }

  profilMenuHA() {
    if (this.profilMenuMegjelenites) {
      this.profilMenuMegjelenites = false;
    }
  }

  menu() {
    this.menuMegjelenites =!this.menuMegjelenites;
  }

  menuHA() {
    if (this.menuMegjelenites) {
      this.menuMegjelenites = false;
    }
  }

  menuESProfilMenuHA() {
    this.profilMenuHA();
    this.menuHA();
  }

  kijelentkezes() {
    this.authservice.kijelentkezes();
    this.router.navigate(['/']);
  }
}
