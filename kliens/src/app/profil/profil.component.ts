import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { ForumService } from '../services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-profil',
    imports: [FooterComponent, CommonModule],
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';

  felhasznaloNev: string = '';
  felhasznaloKep: string = '';
  vanFelhasznalo: boolean = false;

  constructor(
    private authservice: AuthService, 
    private forumservice: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  profilBetoltes(): void {

    const url = window.location.href;
    const kuldottFelhasznalonev = this.felhasznalonevUrlbol(url);

    this.forumservice.profilLekeresMasik(kuldottFelhasznalonev).subscribe(
      (profil) => {
        this.felhasznaloNev = profil.másikfelhasználó.felhasznalonev
        this.felhasznaloKep = profil.másikfelhasználó.kep
        this.vanFelhasznalo = true;
      },
      (error) => {
        if (error.status === 404) {
          console.warn("Felhasználó nem található, visszalépés az előző oldalra...");
          this.location.back();
        } else {
          console.error("Hiba történt:", error);
        }
      }
    )
  }

  felhasznalonevUrlbol(url: string): string {
    const regex = /forum\/profil\/([a-zA-Z0-9áéíóöőúüÁÉÍÓÖŐÚÜ-]+)/;
    const match = url.match(regex);
    
    if (match) {
        return match[1];
    } else {
        console.error('Szöveg nem található az URL-ben');
        return '';
    }
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.profilBetoltes();
    });

    this.authservice.szamSzin$.subscribe( szam => {
      if(szam === 1){
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.temaSzinGordulo = 'feketeG';
      }
      else if(szam === 2){
        this.temaSzin = 'feherK';
        this.temaSzin2 = 'feherK2';
        this.temaSzinN = 'feherN';
        this.temaSzinBetu = 'feherBetu';
        this.temaSzinHover = 'feherH'
        this.temaSzinGordulo = 'feherG';
      }
      else if(szam === 3){
        this.temaSzin = 'vorosK';
        this.temaSzin2 = 'vorosK2';
        this.temaSzinN = 'vorosN';
        this.temaSzinBetu = 'vorosBetu';
        this.temaSzinHover = 'vorosH';
        this.temaSzinGordulo = 'vorosG';
      }else{
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