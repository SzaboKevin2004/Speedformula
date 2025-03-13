// Navigációs sáv viselkedéséért, működéséért felelős ts
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

  //Profiladatok hozzáadása az AuthService-ből, pl felhasználó név, profilkép stb.
  profilLekeres() {
    this.authservice.profilLekeres().subscribe({
      next: (response) => {
        const profilAdatok = response.felhasználó;
        this.lekertFelhasznalonev = profilAdatok.felhasznalonev;
        this.lekertEmail = profilAdatok.email;
        this.lekertTema_id = profilAdatok.tema_id;
        this.lekertKep = profilAdatok.kep;
      },
      error: (error) => {
        console.error('Hiba történt a profil lekérésénél:', error);
      }
    })
  }

  ngOnInit() {
    //Jelenlegi oldal URL-ének változóba tétele
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const jelenlegiUrl = this.router.url;

      // Automatikus fehér háttér beállítás (bizonyos, "kivétel" oldalakhoz: Regisztráció, Bejelentkezés, Hiba, Visszajelzés)
      if (this.isFeherOldal()) {
        if (typeof document !== 'undefined') {
          document.body.className = 'feherBg';
        }

      // Minden más oldal háttérszínét, betűszínét, színeit - téma alapján beállítása
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
      //Bizonyos "kivétel" oldalakon ne jelenítse meg a navigációs sávot (regisztráció, bejelentkezés, hiba, visszajelzés oldalakon)
      this.navMegjelenites = !(jelenlegiUrl.includes('bejelentkezes') || 
      jelenlegiUrl.includes('regisztracio') || 
      jelenlegiUrl.includes('hiba') || 
      jelenlegiUrl.includes('visszajelzes'));
    });

    //Megvizsgálja hogy a felhasználó belejentkezve van-e
    //Amennyiben igen, megjeleníti a profilt és hozzátartozó adatokat és eltünteti a regisztráció, bejelentkezési gombot
    //Ha nincs bejelentkezve, akkor ennek az ellentetje történik meg
    this.authservice.felhBejelentkezettE$.subscribe(bejelentkezettE => {
      this.bejelentkezesMegjelenites = !bejelentkezettE;
      this.profilMegjelenites = bejelentkezettE;
    });

    //Felhasználó alapértelemezett profilkép elérési útvonalának változóban tárolása
    this.authservice.randomKep$.subscribe(kep => {
      this.randomKep = kep;
    });

    this.authservice.profilLekeres().subscribe();

    //Felhasználó nevének változóban tárolása
    this.authservice.felhasznaloNev$.subscribe(nev => {
      this.felhasznaloNev = nev;
    });
  }

  //Megvizsgálja hogy az adott oldal a "kivétel oldalakhoz tartoznak-e"
  isFeherOldal(): boolean {
    return this.router.url === '/visszajelzes' || 
    this.router.url === '/bejelentkezes' ||
    this.router.url === '/regisztracio' || 
    this.router.url === '/hiba';
  }

  //profil menüjének megnyitása/bezárása
  profilMenu() {
    this.profilMenuMegjelenites = !this.profilMenuMegjelenites;

    if (this.menuMegjelenites) {
      this.menuMegjelenites = false;
    }
  }

  //profil menü bezárása, ha nyitva van
  profilMenuHA() {
    if (this.profilMenuMegjelenites) {
      this.profilMenuMegjelenites = false;
    }
  }

  //Kis méretű képernyők navigációs menüjének megnyitása/bezárása
  menu() {
    this.menuMegjelenites =!this.menuMegjelenites;
  }

  //Kis méretű képernyők navigációs menüjének bezárása, ha nyitva van
  menuHA() {
    if (this.menuMegjelenites) {
      this.menuMegjelenites = false;
    }
  }

  //Kis méretű képernyők esetén egyszerre bezárja a profil menüt és a navigációs menüt
  menuESProfilMenuHA() {
    this.profilMenuHA();
    this.menuHA();
  }

  kijelentkezes() {
    this.authservice.kijelentkezes();
    this.router.navigate(['/']);
  }
}
