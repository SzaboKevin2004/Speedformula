import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ForumService } from '../services/forum.service';

@Component({
    selector: 'app-forum',
    imports: [CommonModule ],
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

  posztok: any[] = [];

  constructor(private authservice: AuthService, private forumService: ForumService) {}

  posztBetoltes(): void {
    this.forumService.getPosts().subscribe(
      (response) => {
        this.posztok = response;
      },
      (error) => {
        console.error('Hiba történt a posztok betöltésekor:', error);
      }
    );
    console.log('Posztok:', this.posztok);
  }

  ngOnInit() {
    this.posztBetoltes();

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