import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forum-poszt-reszlet',
  imports: [CommonModule, FormsModule],
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
  megnyitottKommentId: number | null = null;

  constructor(private authservice: AuthService, private route: ActivatedRoute, private forumService: ForumService, private router: Router) {}

  posztBetoltes(): void {
    this.forumService.getPosts().subscribe(
      (response ) => {
        this.posztok = response.map((poszt: any) => ({
          ...poszt,
          elteltIdo: this.elteltIdoSzamitasa(poszt.elkuldve),
        }));

        const url = window.location.href;
        const posztId = this.posztIdUrlbol(url);

        this.forumService.getComments(posztId).subscribe(
          (response ) => {
            this.kommentek = response.map((komment: any) => ({
              ...komment,
              
              elteltIdo: this.elteltIdoSzamitasa(komment.elkuldve),
            }));
            console.log('Kommentek:', this.kommentek)
          }
        );

        this.poszt = this.posztok.find(poszt => poszt.id === posztId);

        if (!this.poszt) {
          console.error('Poszt nem található');
        } else {
          this.poszt.elteltIdo = this.elteltIdoSzamitasa(this.poszt.elkuldve);
          console.log("Poszt:", this.poszt);
        }
      },
      (error) => {
        console.error('Hiba történt a poszt betöltésekor:', error);
      }
    );
  }

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

  kedvelesClick(postId: number) {
    const poszt = this.posztok.find(p => p.id === postId);
    if (!poszt) return;

    poszt.kedvelte = true;
    poszt.kedveles += 1;

    this.forumService.likePost(postId).subscribe(
      (response) => {
        console.log('Kedvelés sikeresen megtörtént:', response);
      },
      (error) => {
        console.error('Hiba történt a kedvelés megerősítésénél:', error);
        poszt.kedvelte = false;
        poszt.kedveles -= 1;
      }
    );
  }

  kikedvelesClick(postId: number) {
    const poszt = this.posztok.find(p => p.id === postId);
    if (!poszt) return;

    poszt.kedvelte = false;
    poszt.kedveles -= 1;

    this.forumService.dislikePost(postId).subscribe(
      (response) => {
        console.log('Kikedvelés sikeresen megtörtént:', response);
      },
      (error) => {
        console.error('Hiba történt a kikedvelés megerősítésénél:', error);
        poszt.kedvelte = true;
        poszt.kedveles += 1;
      }
    );
  }

  urlMasolas(postId: number) {
    const url = `${window.location.origin}/forum/${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('A poszt linkje kimásolva! 📋');
    }).catch(err => {
      console.error('Hiba történt a másolás során:', err);
    });
  }

  uzenetKuldesMegjelenitesClick(){
    this.uzenetKuldesMegjelenites =!this.uzenetKuldesMegjelenites;

    if (this.uzenetKuldesMegjelenites) {
      this.uzenet = '';
    }

    this.uzenetGombMegjelenites = false;

    setTimeout(() => {
      this.textarea.nativeElement.focus();
    }, 50);
  }

  mentes(postId: number){
    const poszt = this.posztok.find(p => p.id === postId);
    if (!poszt) return;

    const adatok = {
      posztid: postId,
      szoveg: this.uzenet
    }

    poszt.kommentek += 1


    this.forumService.addCommentToPost( adatok
    ).subscribe({
      next: (response) => {
        console.log('Sikeres komment létrehozás:', response);
        setTimeout(async () => {
          this.uzenetKuldesMegjelenites = false;
          this.uzenetGombMegjelenites = true;
          this.uzenet = '';
          const jelenlegiUrl = this.router.url;
          await this.router.navigate(['forum']);
          await this.router.navigate([jelenlegiUrl]);
        }, 50);
      },
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

  bezar(){
    this.uzenetKuldesMegjelenites = false;
    this.uzenet = '';
    this.uzenetGombMegjelenites = true;
  }

  kedvelesKommentClick(commentId: number) {
    const komment = this.kommentek.find(c => c.id === commentId);
    if (!komment) return;

    komment.kedvelte = true;
    komment.kedveles += 1;

    this.forumService.likeComment(commentId).subscribe(
      (response) => {
        console.log('Komment kedvelés sikeresen megtörtént:', response);
      },
      (error) => {
        console.error('Hiba történt a komment kedvelés megerősítésénél:', error);
        komment.kedvelte = false;
        komment.kedveles -= 1;
      }
    );
  }

  
  kikedvelesKommentClick(commentId: number) {
    const komment = this.kommentek.find(c => c.id === commentId);
    if (!komment) return;

    komment.kedvelte = false;
    komment.kedveles -= 1;

    this.forumService.dislikeComment(commentId).subscribe(
      (response) => {
        console.log('Komment Kikedvelés sikeresen megtörtént:', response);
      },
      (error) => {
        console.error('Hiba történt a komment kikedvelés megerősítésénél:', error);
        komment.kedvelte = true;
        komment.kedveles += 1;
      }
    );
  }

  kommentUzenetKuldesMegjelenitesClick(commentId: number) {
    this.uzenetek[commentId] = '';
    if (this.megnyitottKommentId === commentId) {
      this.megnyitottKommentId = null;
    } else {
      this.megnyitottKommentId = commentId;
      if (!this.uzenetek[commentId]) {
        this.uzenetek[commentId] = '';
      }
    }
  }

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
      next: (response) => {
        console.log('Sikeres komment létrehozás:', response);
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

  bezarKomment(commentId: number){
    this.megnyitottKommentId = null;
    this.uzenetek[commentId] = '';
  }

  ngOnInit() {
    this.posztBetoltes();
    this.authservice.felhBejelentkezettE$.subscribe(bejelentkezettE => {
      this.haBejelentkezett = bejelentkezettE;
    });

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
