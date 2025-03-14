// Beállítások viselkedéséért, működéséért felelős ts
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
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
  lekertBemutatkozas: string = 'írj valamit ide!';

  felhasznalonev: string | undefined = undefined;
  email: string | undefined = undefined;
  password: string | undefined = undefined;
  tema_id: number | undefined = undefined;
  kep: number | undefined = undefined;
  bemutatkozas: string | undefined = undefined;

  ujEmail: string | undefined = undefined;
  ujPassword: string | undefined = undefined;
  ujraPassword: string | undefined = undefined;
  ujFelhasznalonev: string | undefined = undefined;
  ujBemutatkozas: string | undefined = undefined;
  modositasNyitvaE: boolean = false;
  modositasCim: string = '';
  modositasPlaceHolder: string = '';
  fiokTorlesNyitvaE: boolean = false;
  jelszoLathatoE: boolean = false;
  jelszoLathatoE2: boolean = false;

  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';
  constructor(private authservice: AuthService, private router: Router) {}

  // jelszó láthatóságot állítja. Alapértelmezetten hamis érték, ha igaz értéket kap akkor láthatóvá válik a jelszó a jelszó beírásnál.
  jelszoLathatosag() {
    this.jelszoLathatoE = !this.jelszoLathatoE;
  }
  jelszoLathatosag2() {
    this.jelszoLathatoE2 =!this.jelszoLathatoE2;
  }

  // Amikor rákattint a felhasználó az adott adat módosítására, megnyitja a módosítást, és az adott módosítás szerint állítja be a neki megjelenő módosításnak címét, beviteli mező szövegét
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

    } else if (modositasTipus === 'bemutatkozas') {
      this.modositasCim = 'Bemutatkozás módosítása';
      this.modositasPlaceHolder = 'Új bemutatkozás';
    }
  }

// Megnyitas a fiók törlést
  megnyitFiokTorles() {
    this.fiokTorlesNyitvaE = true;
  }

  // Felhasználó törlésre kérést küld a backendnek, amit az AuthService továbbít oda, sikeres esetén kitörli a felhasználót, annak adatait a helyi tárolóból, mindent alapértelmezettre állít és visszairányítja a főoldalra.
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

  // Bezárja a módosítást és minden módosított értéket, amit megadott kitörli
  bezarModositas() {
    this.modositasNyitvaE = false;
    this.fiokTorlesNyitvaE = false;
    this.ujEmail = undefined;
    this.ujPassword = undefined;
    this.ujraPassword = undefined;
    this.ujFelhasznalonev = undefined;
    this.ujBemutatkozas = undefined;
    this.hiba = false;
    this.hibaUzenet = '';
  }

  // Felhasználó módosításra kérést küld a backendnek, amit az AuthService továbbít oda, sikeres esetén frissíti a felhasználó adatait
  mentesModositas() {
    this.hiba = false;
    this.hibaUzenet = '';
    this.siker = false;
    this.sikerUzenet = '';

    // Objektum melyben a módosított adatok változóit küldi az AuthService-nek majd tovább
    const profilData = {
      felhasznalonev : this.ujFelhasznalonev,
      email : this.ujEmail,
      password : this.ujPassword,
      tema_id : undefined,
      kep: undefined,
      bemutatkozas: this.ujBemutatkozas
    }

    // Ha a jelszó módosítás esetén van megadva, akkor ellenőrzi, hogy a két jelszó megegyezik-e
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
      profilData.kep,
      profilData.bemutatkozas
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
          // profilLekeres-t meghívjuk hogy a felhasználónál a módosított adat egyből megjelenjen
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
    //console.log(profilData)
  }

  // Felhasználó kép módosításra kérést küld a backendnek, amit az AuthService továbbít oda, siker esetén beállítja az új random képet
  kepModositas(){
    this.authservice.kepModositas().subscribe({
      next: (response) => {
        //console.log('Sikeres kép módosítás:', response);
        this.profilLekeres();
      },
      error: (error) => {
        //console.error('Hiba történt a kép módosításakor:', error);
      }
    });
  }

  // Témáváltásra kérést küld a backendnek, amit az AuthService továbbít oda
  temaModositas() {
    // Objektum melyben az új téma azonosítóját (id)-t küldi változóban az AuthService-nek
    const profilData = {
      felhasznalonev : undefined,
      email : undefined,
      password : undefined,
      tema_id : this.tema_id,
      kep: undefined
    }

    // Ha megváltozott a téma id-ja (témamódosítás miatt) akkor annak az idját elküldi
    if(this.tema_id != -1){
      this.authservice.profilModositas(
        profilData.felhasznalonev,
        profilData.email,
        profilData.password, 
        profilData.tema_id,
      ).subscribe({
        next: (response) => {
          //console.log('Sikeres módosítás:', response);
        },
        error: (error) => {
          this.hiba = true;
          //console.error('Hiba történt a profil módosításakor:', error);
        }
      });
    }
  }

  // Felhasználó adatainak lekérdező metódusa
  profilLekeres() {
    // Random 8-14 közötti karakterhossz között előállít csillagkaraktereket, ez amiatt kell mert a tényleges jelszókaraktereinek számát nem jelenítjük meg biztonsági okokból.
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
        this.lekertBemutatkozas = profilAdatok.magamrol
        //console.log(profilAdatok)
        // Ha még nem írt bemutatkozást a felhaználó a fórum profiljának oldalra, ez a szöveg jelenik meg.
        if(profilAdatok.magamrol === ''){
          this.lekertBemutatkozas = 'Írj egy bemutatkozást...';
        }

      },
      error: (error) => {
        console.error('Hiba történt a profil lekérésénél:', error);
      }
    })
  }

  ngOnInit() {

    this.profilLekeres();

    // téma beállítás
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

  // Témáváltás esemény: Világos témára váltás
  vilagosMegjelenites() {
    this.vilagos = true;
    this.sotet = false;
    this.voros = false;
    this.authservice.setTheme(2);
    this.tema_id = 2;
  }

  // Témáváltás esemény: Sötét témára váltás
  sotetMegjelenites() {
    this.vilagos = false;
    this.sotet = true;
    this.voros = false;
    this.authservice.setTheme(1);
    this.tema_id = 1;
  }

  // Témáváltás esemény: Vörös témára váltás
  vorosMegjelenites() {
    this.vilagos = false;
    this.sotet = false;
    this.voros = true;
    this.authservice.setTheme(3);
    this.tema_id = 3;
  }
}
