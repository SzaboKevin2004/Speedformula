// Fórum főoldala viselkedéséért, működéséért felelős js
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ForumService } from '../services/forum.service';

@Component({
    selector: 'app-forum',
    imports: [CommonModule, RouterModule],
    templateUrl: './forum.component.html',
    styleUrl: './forum.component.css',
    encapsulation: ViewEncapsulation.None
})
export class ForumComponent implements OnInit {
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';
  sotet: boolean = true;
  vilagos: boolean = false;
  voros: boolean = false;

  posztok: any[] = [];

  haBejelentkezett: boolean = false;
  kedveles: boolean = true;
  kikedveles: boolean = false;

  felhasznaloNev: string = '';
  szerep: number = 2;

  constructor(private authservice: AuthService, private forumService: ForumService) {}

  // Posztok betöltése
  posztBetoltes(): void {
    this.forumService.getPosts().subscribe(
      (response ) => {
        this.posztok = response.map((poszt: any) => ({
          ...poszt,
          // Elteltidő tárolása
          elteltIdo: this.elteltIdoSzamitasa(poszt.elkuldve),
          // Megvizsgálja felhasználónév egyezés alapján hogy a bejelentkezett felhasználóhoz tartozik-e az adott profil oldal. Ennek logikai értékét a "sajatFelhasznalo" váltózóban tárolja el.
          sajatFelhasznalo: poszt.felhasznalo === this.felhasznaloNev
          
        }));
        //console.log(this.posztok);
      },
      (error) => {
        console.error('Hiba történt a posztok betöltésekor:', error);
      }
    );
  }

  // Profil lekérése, a kapott lekérésből eltároljuk változóban a szerepet (normál felhasználó, admin felhasználó )
  profilLekeres(): void {
    this.authservice.profilLekeres().subscribe(
      (response) => {
        this.szerep = response.felhasználó.szerep_id;
        //console.log(this.szerep);
      },
      (error) => {
        console.error('Hiba történt a felhasználó lekérdezésekor:', error);
      }
    );
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

  // Poszt kedvelés. Poszt kedvelés kérést küld a backendnek a forumService-n át.
  kedvelesClick(postId: number) {
    // A posztok tömbben megkeresi az adott posztot az azonosítója (id-ja) alapján, ha nem találja akkor kilép retun-nel
    const poszt = this.posztok.find(p => p.id === postId);
    if (!poszt) return;

    // Amennyiben megtalálja a kedvelte változót igazra állítja a kedvelés megjelenítés miatt, illetve megnöveli +1el a kedveles változót hogy azonnal megjelenjen a módosulása a felhasználónál
    poszt.kedvelte = true;
    poszt.kedveles += 1;

    //  Itt küldi el a kérést a forumService-n át
    this.forumService.likePost(postId).subscribe(
      (response) => {
        //console.log('Kedvelés sikeresen megtörtént:', response);
      },
      // Hiba esetén visszaállítja a kedvelte logikai változót, illetve a kedveles értékét
      (error) => {
        console.error('Hiba történt a kedvelés megerősítésénél:', error);
        poszt.kedvelte = false;
        poszt.kedveles -= 1;
      }
    );
  }

   // Poszt kikedvelés. Poszt kikedvelés kérést küld a backendnek a forumService-n át. Ugyanaz történik, mint a kedvelésnél.
  kikedvelesClick(postId: number) {
    const poszt = this.posztok.find(p => p.id === postId);
    if (!poszt) return;

    poszt.kedvelte = false;
    poszt.kedveles -= 1;

    this.forumService.dislikePost(postId).subscribe(
      (response) => {
        //console.log('Kikedvelés sikeresen megtörtént:', response);
      },
      (error) => {
        console.error('Hiba történt a kikedvelés megerősítésénél:', error);
        poszt.kedvelte = true;
        poszt.kedveles += 1;
      }
    );
  }

  // Poszt URL másolás. Az adott poszt id-ja alapján másolja az urlt. Az alap útvonalat meghatározza majd a végponthoz a poszt azonosítóját állítja be és ezt url változóba tárolja. Majd ezt a változót másolja ki a navigator.clipboard.writeText-el 
  urlMasolas(postId: number) {
    const url = `${window.location.origin}/forum/${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('A poszt linkje kimásolva! 📋');
    }).catch(err => {
      console.error('Hiba történt a másolás során:', err);
    });
  }

  // Poszt törölés. Poszt azonosító (id) alapján küld törlési kérelmet a backendnek a forumService-n át, majd sikeres válasz esetén újra betölti a posztokat.
  posztTorles(postId: number){
    //console.log(postId);
    this.forumService.deletePost(postId).subscribe(
      (response) => {
        //console.log('Poszt sikeresen törölve:', response);
        this.posztBetoltes();
      },
      (error) => {
        console.error('Hiba történt a poszt törlésénél:', error);
      }
    );
  }

  // Hozzáadásra kerülnek authService observable-ből a következő változók: felhasznaloNev (felhasználónevet tárolja), szerep (normál felhasználó, vagy admin), haBejelentkezett (logikai változó mely azt vizsgálja hogy bejelentkezett-e a felhasználó)
  // Illetve itt kerül betöltésre/meghívásra a posztBetoltes()
  ngOnInit() {
    this.authservice.felhasznaloNev$.subscribe(nev => {
      this.felhasznaloNev = nev;
    });
    this.authservice.szerep$.subscribe(szerep => {
      this.szerep = szerep;
    });

    this.posztBetoltes();

    this.authservice.felhBejelentkezettE$.subscribe(bejelentkezettE => {
      this.haBejelentkezett = bejelentkezettE;
    });


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