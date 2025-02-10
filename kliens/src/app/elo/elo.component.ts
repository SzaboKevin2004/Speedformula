import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../safe-url.pipe';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ElochatService } from '../services/elochat.service';

@Component({
  selector: 'app-elo',
  imports: [FooterComponent, CommonModule, SafeUrlPipe, FormsModule],
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

  videoUrl: string = 'https://www.youtube.com/watch?v=WDnkv0X8H3g';
  liveMegyE: boolean = false;

  felhasznaloNev: string = '';
  randomKep: string = '';
  uzenetek: any[] = [];
  ujUzenet: string = '';
  uzenetKuldesMegjelenites: boolean = false;
  ujUzenetE: boolean = false;
  felgorgetettE: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private router: Router,
    private http: HttpClient,
    private authservice: AuthService, 
    private elochatservice: ElochatService
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

      this.elochatservice.sendChatMessage(uzenet.text).subscribe(
        (response) => {
          console.log('Üzenet sikeresen elküldve:', response);
          this.elochatservice.getMessages().subscribe();
        },
        (error) => {
          console.error('Hiba történt az üzenet küldése során:', error);
        }
      );

      this.ujUzenet = ''; 
    } else {
      console.error('Üzenet megadása kötelező!');
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      interval(500)
        .pipe(
          switchMap(() => this.elochatservice.getMessages())
        )
        .subscribe(
          (uzenetek) => {
            const uzenet = uzenetek.filter((msg) => !this.uzenetek.some(meglevoUzenet => meglevoUzenet.id === msg.id));
            if (uzenet.length > 0) {
              const ujUzenetek = uzenet.map(message => {
                const kepUrl = this.authservice.getKepEleres()[message.kep];
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

      this.liveEllenorzes();
    }
  }

  liveEllenorzes() {
    const videoId = this.getVideoIdFromUrl(this.videoUrl);
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  
    this.http.get(url).subscribe({
      next: (response) => {
        console.log('Élő adás aktív:', response);
        this.liveMegyE = true;
      },
      error: (error) => {
        console.log('Nincs élő adás:', error);
        this.liveMegyE = false;
      }
    });
  }

  getVideoIdFromUrl(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=)|(?:youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
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
