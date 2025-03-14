//Poszt részlet(kommentek) oldal viselkedéséért, működéséért felelős ts
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-forum-poszt-reszlet',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forum-poszt-reszlet.component.html',
  styleUrl: './forum-poszt-reszlet.component.css'
})
export class ForumPosztReszletComponent implements OnInit {
  @ViewChild('textarea') textarea!: ElementRef;
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';
  sotet: boolean = true;
  vilagos: boolean = false;
  voros: boolean = false;

  haBejelentkezett: boolean = false;
  posztok: any[] = [];
  poszt: any;
  komment: any;
  postId: number = -1;
  
  uzenetGombMegjelenites: boolean = true;
  uzenetKuldesMegjelenites: boolean = false;

  uzenet: string = '';

  hiba: boolean = false;
  hibaUzenet: string = '';

  kommentek: any[] = [];

  uzenetek: { [key: number]: string } = {};
  alUzenetek: { [key: number]: string } = {};  
  megnyitottKommentId: number | null = null;

  alKommentMegjelenites: boolean = false;
  megnyitottAlkommentId: number | null = null;

  felhasznaloNev: string = '';
  szerep: number = 2;

  constructor(private authservice: AuthService, private route: ActivatedRoute, private forumService: ForumService, private router: Router, private renderer: Renderer2, private location: Location) {}

  // Metódus mely a felhasználót visszairányítja az előző oldalra
  vissza(){
    this.location.back();
  }

  // Itt hajtódik végre a felhasználó linkelése. Az adott tartalom elé készít egy linkelést a felhasználó oldalára
  linkeles(szoveg: string): string {
    const regex = /@([a-zA-ZáÁéÉíÍóÓöÖőŐúÚüÜűŰa-zA-Z0-9_.-]+)/g;
    return szoveg.replace(regex, (tartalom, felhasznalonev) => {
      return `<a href="/forum/profil/${felhasznalonev}" class="felhasznalo-link">${tartalom}</a>`;
    });
  }

  // Felhasználja a linkeles()-t és alkalmazza azt az adott elemre
  szovegbolLink(element: HTMLElement, szoveg: string) {
    const linkreformalt = this.linkeles(szoveg);
    this.renderer.setProperty(element, 'innerHTML', linkreformalt);
  }

  // Itt kerülnek betöltésre a posztok a forumService get kérés hívásával a backendből
  posztBetoltes(): void {
    this.forumService.getPosts().subscribe(
      (response) => {
        this.posztok = response.map((poszt: any) => ({
          ...poszt,
          // Elteltidő tárolása
          elteltIdo: this.elteltIdoSzamitasa(poszt.elkuldve),
          // Megvizsgálja felhasználónév egyezés alapján hogy a bejelentkezett felhasználóhoz tartozik-e az adott poszt. Ennek logikai értékét a "sajatFelhasznalo" váltózóban tárolja el.
          sajatFelhasznalo: poszt.felhasznalo === this.felhasznaloNev
        }));


        // Jelenlegi url tárolása változóban, majd változóból kinyerni az poszt (id) azonosítót a posztIdUrlbol() segítségével és posztId változóba eltárolni.
        const url = window.location.href;
        const posztId = this.posztIdUrlbol(url);
  
        // Kommentek lekérése az adott poszthoz. Lekérjük backendből forumService-n át a kommenteket a posztId változó segítségével.
        this.forumService.getComments(posztId).subscribe(
          (response) => {
            // Egy Map-ben eltároljuk a kommenteket, majd végigiterálunk a visszaadott response-on.
            const kommentMap = new Map<number, any>();
            const foKommentek: any[] = [];
        
            // Minden kommenthez hozzáadjuk a korábban már leírt elteltIdo-t és a sajatFelhasznalo-t, illetve létrehozunk a kommenteknek egy alKommentek tömböt, ahová majd a kommentre érkező kommentek kerülnek.
            response.forEach((komment: any) => {
              komment.elteltIdo = this.elteltIdoSzamitasa(komment.elkuldve);
              komment.sajatFelhasznalo = komment.felhasznalo === this.felhasznaloNev;
              komment.alKommmentek = [];
              // A Maphez hozzáadjuk a komment id-t és a magát a kommentet.
              kommentMap.set(komment.id, komment);
            });

            // A Map-ból visszaadunk a főkommenteket, majd végigiterálunk őket. Ha a komment kommentszuloja null, akkor a komment fő komment,
            // mivel nincs szülő kommentje és hozzáadjuk a foKommentek tömbhöz. Ha van, akkor a kommentet hozzáadjuk az alKommentek tömbbe. (Ezek lesznek a kommentekre érkező kommentek)
            response.forEach((komment: any) => {
              if (komment.kommentszulo === null) {
                foKommentek.push(komment);
              } else {
                const szuloKomment = kommentMap.get(komment.kommentszulo);
                if (szuloKomment) {
                  szuloKomment.alKommmentek.push(komment);
                }
              }
            });

            this.kommentek = foKommentek;
        
            //console.log('Főkommentek:', this.kommentek);
            this.kommentek.forEach(komment => {
            //console.log('Alkommentek:', komment.alKommmentek);
            });
          },
          (error) => {
            console.error('Hiba történt a kommentek betöltésekor:', error);
          }
        );
  
        // Poszthoz tartozó adatok eltárolása poszt változóban melyet a posztokon való körbejáráskor a jelenlegi poszt id és az adott poszt id egyezése alapján fűz hozzá.
        this.poszt = this.posztok.find(poszt => poszt.id === posztId);
  
        if (!this.poszt) {
          console.error('Poszt nem található');
        } else {
          this.poszt.elteltIdo = this.elteltIdoSzamitasa(this.poszt.elkuldve);
          //console.log("Poszt:", this.poszt);
        }
      },
      (error) => {
        console.error('Hiba történt a poszt betöltésekor:', error);
      }
    );
  }
  // Poszt id (azonosító) kinyerés URL-ből
  posztIdUrlbol(url: string): number {
    const regex = /forum\/(\d+)/;
    const match = url.match(regex);
    if (match) {
      return +match[1];
    } else {
      console.error('ID nem található az URL-ben');
      return -1;
    }
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

  // Az adott üzenet küldési keretre kattintva hívódik meg ez a metódus.
  // A metódus megnyitja az üzenetküldési dobozt és annak üzenetét üresre állítja, ez amiatt kell ha több helyre akar a felhasználó üzenetet küldeni ne jelenítse meg az előzőeket.
  uzenetKuldesMegjelenitesClick(){
    this.uzenetKuldesMegjelenites =!this.uzenetKuldesMegjelenites;

    if (this.uzenetKuldesMegjelenites) {
      this.uzenet = '';
    }

    this.uzenetGombMegjelenites = false;

    // Ennek segítségével fókuszál bele (azaz teszi lehetővé hogy egyből írni lehessen bele) a szövegdobozba.
    // A késleltetés azért szükséges, mert nem mindig tudja nyomonkövetni a rendszer az azonnali fókuszálást, mert hamarabb fókuszálna, minthogy megjelenne a szövegdoboz
    setTimeout(() => {
      this.textarea.nativeElement.focus();
    }, 50);
  }

  // mentes() hajtja végre a posztra kommentelést melynél megvizsgálja először a poszt id ját, ha nem talál ilyen posztot akkor returnol azaz megszakítja a folyamatot.
  mentes(postId: number){
    const poszt = this.posztok.find(p => p.id === postId);
    if (!poszt) return;

    // adatok nevű obejtumban eltárolja a következő adatokat: poszt id, komment szövege
    const adatok = {
      posztid: postId,
      szoveg: this.uzenet
    }
    // Megnöveli a kommentek számát  a felhasználónak hogy azonnal lássa a frissítését

    poszt.kommentek += 1

    // Az obejtumot kéréssel elküldi a backend felé a forumService-n át. Sikeres kérés esetén mindent visszaállít alapértelmezettre majd
    // Átnavigálja őt a fórum főoldalára és vissza a jelenlegi adott posztra (ezt olyan gyorsasággal hogy a felhasználó nem érzékel belőle semmit)
    // Ezzel egyből frissítést tapasztal a felhasználó és látni fogja a kommentjét
    this.forumService.addCommentToPost( adatok
    ).subscribe({
      next: (response) => {
        //console.log('Sikeres komment létrehozás:', response);
        setTimeout(async () => {
          this.uzenetKuldesMegjelenites = false;
          this.uzenetGombMegjelenites = true;
          this.uzenet = '';
          const jelenlegiUrl = this.router.url;
          await this.router.navigate(['forum']);
          await this.router.navigate([jelenlegiUrl]);
        }, 50);
      },
      // Hiba esetén egy hibaüzenet jelenik meg, és visszaállítja a kommentek számát.
      error: (err) => {
        this.hiba = true;
        poszt.kommentek -= 1
        if (err.error?.message) {
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = "Ismeretlen hiba történt a komment létrehozása során!";
        }
      }
    });
  }

  // Bezárja a kommentelő szövegdobozt
  bezar(){
    this.uzenetKuldesMegjelenites = false;
    this.uzenet = '';
    this.uzenetGombMegjelenites = true;
  }


  // Komment kedvelés. Komment kedvelés kérést küld a backendnek a forumService-n át. Ugyanaz történik, mint a poszt kedvelésnél.

  kedvelesKommentClick(commentId: number) {
    const komment = this.kommentek.find(c => c.id === commentId);
    if (!komment) return;

    komment.kedvelte = true;
    komment.kedveles += 1;

    this.forumService.likeComment(commentId).subscribe(
      (response) => {
        //console.log('Komment kedvelés sikeresen megtörtént:', response);
      },
      (error) => {
        console.error('Hiba történt a komment kedvelés megerősítésénél:', error);
        komment.kedvelte = false;
        komment.kedveles -= 1;
      }
    );
  }

  // Komment kikedvelés. Komment kikedvelés kérést küld a backendnek a forumService-n át. Ugyanaz történik, mint a poszt kikedvelésnél.
  kikedvelesKommentClick(commentId: number) {
    const komment = this.kommentek.find(c => c.id === commentId);
    if (!komment) return;

    komment.kedvelte = false;
    komment.kedveles -= 1;

    this.forumService.dislikeComment(commentId).subscribe(
      (response) => {
        //console.log('Komment Kikedvelés sikeresen megtörtént:', response);
      },
      (error) => {
        console.error('Hiba történt a komment kikedvelés megerősítésénél:', error);
        komment.kedvelte = true;
        komment.kedveles += 1;
      }
    );
  }

  // A komment küldési szövegdoboz-t megjelenítse
  kommentUzenetKuldesMegjelenitesClick(commentId: number) {
    // A kommentek tömbben megkeresi az adott kommentet az azonosítója (id-ja) alapján, ha nem találja akkor kilép retun-nel
    const komment = this.kommentek.find(k => k.id === commentId);
    if (!komment) return;
  
    // felhasználónévbe tároljuk a komment létrehozónak a felhasználó nevét
    const felhasznaloNev = komment.felhasznalo;
  
    // Ha az éppen megnyitott komment megegyezik az aktuálisan kattintott kommentel, akkor bezárja a szövegdobozt
    if (this.megnyitottKommentId === commentId) {
      this.megnyitottKommentId = null;
    } else {
      //Ha nem egyezik, akkor megnyitja a szövegdobozt azt adott kommenthez.
      this.megnyitottKommentId = commentId;
  
      // Ha az uzenetek[commentId] nincs még beállítva, vagy az adott felhasználónévvel, akkor beállítja az üzenetet @felhasznaloNev formátumban.
      if (!this.uzenetek[commentId] || !this.uzenetek[commentId].startsWith(`@${felhasznaloNev} `)) {
        this.uzenetek[commentId] = `@${felhasznaloNev} `;
      }
    }
  }

    // mentesKomment() hajtja végre a kommentre kommentelést melynél megvizsgálja először a komment id ját, ha nem talál ilyen kommentet akkor returnol azaz megszakítja a folyamatot.
  mentesKomment(commentId: number){
    const komment = this.kommentek.find(k => k.id === commentId);
    if (!komment) return;

    const adatok = {
      kommentid: commentId,
      szoveg: this.uzenetek[commentId]
    }

    komment.alkommentek += 1


    this.forumService.addCommentToComment( adatok
    ).subscribe({
    // Az obejtumot kéréssel elküldi a backend felé a forumService-n át. Sikeres kérés esetén
    // Átnavigálja őt a fórum főoldalára és vissza a jelenlegi adott posztra (ezt olyan gyorsasággal hogy a felhasználó nem érzékel belőle semmit)
    // Ezzel egyből frissítést tapasztal a felhasználó és látni fogja a kommentjét
      next: (response) => {
        //console.log('Sikeres komment létrehozás:', response);
        setTimeout(async () => {
          this.uzenetek[commentId] = '';
          const jelenlegiUrl = this.router.url;
          await this.router.navigate(['forum']);
          await this.router.navigate([jelenlegiUrl]);
        }, 50);
      },
      error: (err) => {
        this.hiba = true;
        komment.alkommentek -= 1
        if (err.error?.message) {
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = "Ismeretlen hiba történt a komment létrehozása során!";
        }
      }
    });
  }

  // bezárKomment() hajtja végre a komment bezárását
  bezarKomment(commentId: number){
    this.megnyitottKommentId = null;
    this.uzenetek[commentId] = '';
  }

  // Az adott "válaszok megnyitás" -szövegre kattintva hívódik meg ez a metódus.
  // A metódus megnyitja a komment alatt található összes alkommentet
  alKommentMegjelenitesClick(commentId: number) {
    if (this.megnyitottAlkommentId === commentId) {
      this.megnyitottAlkommentId = null;
    } else {
      this.megnyitottAlkommentId = commentId;
    }
  }

  // Alkomment kedvelése, melynek kérést a forumService-n át a backendnek továbbítja. Az összes komment összes alKommmentek tömbjét egyetlen tömbbé alakítja
  // Megkeresi azt az alkommentet, amelynek az id-ja megegyezik a kattintott alkomment azonosítójával.
  // Ha nem találja a keresett alkommentet kilép return -nel a függvényből
  kedvelesAlkommentClick(alkommentId: number) {
    const alkomment = this.kommentek
      .flatMap(k => k.alKommmentek)
      .find(a => a.id === alkommentId);
  
    if (!alkomment) return;
  
    // Amennyiben megtalálja a kedvelte változót igazra állítja a kedvelés megjelenítés miatt, illetve megnöveli +1el a kedveles változót hogy azonnal megjelenjen a módosulása a felhasználónál
    alkomment.kedvelte = true;
    alkomment.kedveles += 1;

    this.forumService.likeComment(alkommentId).subscribe(
      (response) => {
        //console.log('Alkomment kedvelése sikeres:', response);
      },
      // Hiba esetén visszaállítja a kedvelte logikai változót, illetve a kedveles értékét
      (error) => {
        console.error('Hiba történt az alkomment kedvelésekor:', error);
        alkomment.kedvelte = false;
        alkomment.kedveles -= 1;
      }
    );
  }
  // Ugyanaz történik itt mint a kedvelesAlkommentClick-nél csak itt a kikedvelésre szólóan
  kikedvelesAlkommentClick(alkommentId: number) {
    const alkomment = this.kommentek
      .flatMap(k => k.alKommmentek)
      .find(a => a.id === alkommentId);
  
    if (!alkomment) return;
  
    alkomment.kedvelte = false;
    alkomment.kedveles -= 1;
  
    this.forumService.dislikeComment(alkommentId).subscribe(
      (response) => {
        //console.log('Alkomment kikedvelése sikeres:', response);
      },
      (error) => {
        console.error('Hiba történt az alkomment kikedvelésekor:', error);
        alkomment.kedvelte = true;
        alkomment.kedveles += 1;
      }
    );
  }

  // Az adott üzenet küldési keretre kattintva hívódik meg ez a metódus.
  // A metódus megnyitja az üzenetküldési dobozt.
  alKommentUzenetKuldesMegjelenitesClick(alkommentId: number, commentId: number) {
    //console.log("alKommentUzenetKuldesMegjelenitesClick meghívva, commentId:", commentId);
  
    const alkomment = this.kommentek
      .flatMap(k => k.alKommmentek)
      .find(a => a.id === alkommentId);
  
    if (!alkomment) {
      //console.log("Nem található alkomment!");
      return;
    }
  
    const felhasznaloNev = alkomment.felhasznalo;
    //console.log("Címzett neve:", felhasznaloNev);
  
    if (this.megnyitottKommentId === alkommentId) {
      //console.log("Bezárás");
      this.megnyitottKommentId = null;
    } else {
      //console.log("Megnyitás és @név hozzáadása");
      this.megnyitottKommentId = alkommentId;
  
      if (!this.uzenetek[commentId] || this.uzenetek[commentId].trim() === '') {
        this.uzenetek[commentId] = `@${felhasznaloNev} `;
      } 
      else if (!this.uzenetek[commentId].startsWith(`@${felhasznaloNev} `)) {
        this.uzenetek[commentId] = `@${felhasznaloNev} ` + this.uzenetek[commentId];
      }
    }
  
    //console.log("Új megnyitottKommentId:", this.megnyitottKommentId);
    //console.log("Aktuális üzenet:", this.uzenetek[commentId]);
  }
  

  // Itt kerül elmentésre az adott alKomment az alkomment id (azonosítója alapján)
  mentesAlKomment(alkommentId: number) {
    const komment = this.kommentek
      .flatMap(k => k.alKommmentek)
      .find(a => a.id === alkommentId);
    if (!komment) return;
  
    const adatok = {
      kommentid: alkommentId,
      szoveg: this.alUzenetek[alkommentId]
    };
  
    this.forumService.addCommentToComment(adatok).subscribe({
      next: (response) => {
        //console.log('Sikeres alkomment létrehozás:', response);
        setTimeout(async () => {
          this.alUzenetek[alkommentId] = '';
          const jelenlegiUrl = this.router.url;
          await this.router.navigate(['forum']);
          await this.router.navigate([jelenlegiUrl]);
        }, 50);
      },
      error: (err) => {
        this.hiba = true;
        if (err.error?.message) {
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = "Ismeretlen hiba történt az alkomment létrehozása során!";
        }
      }
    });
  }

  // Bezárja az alkomment létrehozását
  bezarAlkomment(commentId: number){
    this.megnyitottKommentId = null;
    this.uzenetek[commentId] = '';
    this.alUzenetek[commentId] = '';
  }

  // Poszt törölés. Poszt azonosító (id) alapján küld törlési kérelmet a backendnek a forumService-n át, majd sikeres válasz esetén átnavigálja a felhasználót a fórum főoldalára.
  posztTorles(postId: number){
    //console.log(postId);
    this.forumService.deletePost(postId).subscribe(
      (response) => {
        //console.log('Poszt sikeresen törölve:', response);
        this.router.navigate(['forum']);
      },
      (error) => {
        console.error('Hiba történt a poszt törlésénél:', error);
      }
    );
  }

  // Komment törölés. Komment azonosító (id) alapján küld törlési kérelmet a backendnek a forumService-n át, majd sikeres válasz esetén
  // Átnavigálja őt a fórum főoldalára és vissza a jelenlegi adott posztra (ezt olyan gyorsasággal hogy a felhasználó nem érzékel belőle semmit)
  // Ezzel egyből frissítést tapasztal a felhasználó és törli a kommentjét
  kommentTorles(postId: number){
    //console.log(postId);
    this.forumService.deleteComment(postId).subscribe(
      (response) => {
        //console.log('Komment sikeresen törölve:', response);
        setTimeout(async () => {
          const jelenlegiUrl = this.router.url;
          await this.router.navigate(['forum']);
          await this.router.navigate([jelenlegiUrl]);
        }, 50);
      },
      (error) => {
        console.error('Hiba történt a komment törlésénél:', error);
      }
    );
  }

  // Poszt és kommentek, alkommentek betöltése
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
        this.voros = false
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
      }
    });
  }
}
