import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../safe-url.pipe';
import { interval } from 'rxjs';
import { switchMap, catchError  } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { EloService } from '../services/elo.service';

@Component({
  selector: 'app-elo',
  imports: [ CommonModule, SafeUrlPipe, FormsModule],
  templateUrl: './elo.component.html',
  styleUrls: ['./elo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EloComponent implements OnInit {
  @ViewChild('chatBox') chatBox: ElementRef | undefined;

  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';
  temaSzinHr: string = '';
  vilagos: boolean = false;
  sotet: boolean = true;
  voros: boolean = false;

  videoUrl: string = '';
  liveMegyE: boolean = false;
  chatTorlesE: boolean = false;

  felhasznaloNev: string = '';
  randomKep: string = '';
  uzenetek: any[] = [];
  ujUzenet: string = '';
  uzenetKuldesMegjelenites: boolean = false;
  ujUzenetE: boolean = false;
  felgorgetettE: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private authservice: AuthService, 
    private eloservice: EloService
  ) {}

  gorgetes() {
    this.gorgetesEllenorzes();
  }

  gorgetesEllenorzes() {
    if (this.chatBox) {
      const chatBoxElement = this.chatBox.nativeElement;
      const isAtBottom = chatBoxElement.scrollHeight - chatBoxElement.scrollTop === chatBoxElement.clientHeight;

      if (!isAtBottom) {
        this.felgorgetettE = true;
      } else {
        this.felgorgetettE = false;
      }
    }
  }

  uzenetKuldes() {
    if (this.ujUzenet.trim()) {
      const uzenet = {
        text: this.ujUzenet,
      };

      this.eloservice.sendChatMessage(uzenet.text).subscribe(
        (response) => {
          //console.log('Üzenet sikeresen elküldve:', response);
        },
        (error) => {
          //console.error('Hiba történt az üzenet küldése során:', error);
        }
      );

      this.ujUzenet = ''; 
    } else {
      //console.error('Üzenet megadása kötelező!');
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      interval(500)
        .pipe(
          switchMap(() => this.eloservice.getMessages())
        )
        .subscribe(
          (uzenetek) => {
            const uzenet = uzenetek.filter((msg) => !this.uzenetek.some(meglevoUzenet => meglevoUzenet.id === msg.id));
            if (uzenet.length > 0) {
              const ujUzenetek = uzenet.map(message => {
                const kepUrl = message.kep;
                return { ...message, kep: kepUrl };
              });

              this.uzenetek = [...this.uzenetek, ...ujUzenetek];
              this.ujUzenetE = true;
            }
  
            if (this.ujUzenetE && !this.felgorgetettE) {
              setTimeout(() => this.leGorgetes(), 100);
              this.ujUzenetE = false;
            }
          }
        );

      this.authservice.randomKep$.subscribe(kep => {
        this.randomKep = kep;
      });

      this.authservice.felhBejelentkezettE$.subscribe(bejelentkezettE => {
        this.uzenetKuldesMegjelenites = bejelentkezettE;
      });

      this.authservice.szamSzin$.subscribe(szam => {
        this.setTheme(szam);
      });
      this.chatTorles();
    }
    this.liveEllenorzes();
  }

  liveEllenorzes() {
    this.eloservice.getElo().subscribe((response: any) => {
      if (response.items && response.items.length > 0) {
        const liveVideo = response.items[0];
        const videoId = liveVideo.id.videoId;
        this.videoUrl = this.eloservice.getVideoUrl(videoId);
        this.liveMegyE = true;
      } else {
        this.liveMegyE = false;
        this.chatTorlesE = true;
        this.videoUrl = '';
      }
    }, (error) => {
      console.error('Hiba történt az élő adás lekérdezésekor:', error);
      this.liveMegyE = false;
      this.chatTorlesE = true;
      this.videoUrl = '';
    });
  }

  chatTorles() {
    if (this.chatTorlesE)
    this.eloservice.deleteMessages().subscribe(
      () => {
        console.log('A chat üzenetek törlésre kerültek');
      },
      (error) => {
        console.error('Hiba történt a chat üzenetek törlésében:', error);
      }
    );
  }

  leGorgetes() {
    if (this.chatBox && this.chatBox.nativeElement) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }
  }

  setTheme(szam: number) {
    if (szam === 1) {
      this.temaSzin = 'feketeK';
      this.temaSzin2 = 'feketeK2';
      this.temaSzinN = 'feketeN';
      this.temaSzinBetu = 'feketeBetu';
      this.temaSzinHover = 'feketeH';
      this.temaSzinGordulo = 'feketeG';
      this.temaSzinHr = 'feketeHr';
      this.vilagos = false;
      this.sotet = true;
      this.voros = false;
    } else if (szam === 2) {
      this.temaSzin = 'feherK';
      this.temaSzin2 = 'feherK2';
      this.temaSzinN = 'feherN';
      this.temaSzinBetu = 'feherBetu';
      this.temaSzinHover = 'feherH';
      this.temaSzinGordulo = 'feherG';
      this.temaSzinHr = 'feherHr';
      this.vilagos = true;
      this.sotet = false;
      this.voros = false;
    } else if (szam === 3) {
      this.temaSzin = 'vorosK';
      this.temaSzin2 = 'vorosK2';
      this.temaSzinN = 'vorosN';
      this.temaSzinBetu = 'vorosBetu';
      this.temaSzinHover = 'vorosH';
      this.temaSzinGordulo = 'vorosG';
      this.temaSzinHr = 'vorosHr';
      this.vilagos = false;
      this.sotet = false;
      this.voros = true;
    } else {
      this.temaSzin = 'feketeK';
      this.temaSzin2 = 'feketeK2';
      this.temaSzinN = 'feketeN';
      this.temaSzinBetu = 'feketeBetu';
      this.temaSzinHover = 'feketeH';
      this.temaSzinGordulo = 'feketeG';
      this.temaSzinHr = 'feketeHr';
      this.vilagos = false;
      this.sotet = true;
      this.voros = false;
    }
  }
}
