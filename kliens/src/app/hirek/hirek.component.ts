import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

@Component({
    selector: 'app-hirek',
    imports: [FooterComponent, CommonModule],
    templateUrl: './hirek.component.html',
    styleUrl: './hirek.component.css',
    encapsulation: ViewEncapsulation.None
})
export class HirekComponent implements OnInit {
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';

  hirek: Article[] = [];
  url(url: string) {
    window.open(url, '_blank');
  }

  constructor(private authservice: AuthService, private http: HttpClient, private apiservice: ApiService) {}

  ngOnInit() {
    this.authservice.szamSzin$.subscribe(szam => {
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
        this.temaSzinHover = 'feherH';
        this.temaSzinGordulo = 'feherG';
      }
      else if(szam === 3){
        this.temaSzin = 'vorosK';
        this.temaSzin2 = 'vorosK2';
        this.temaSzinN = 'vorosN';
        this.temaSzinBetu = 'vorosBetu';
        this.temaSzinHover = 'vorosH';
        this.temaSzinGordulo = 'vorosG';
      } else {
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.temaSzinGordulo = 'feketeG';
      }
    });

    this.hirekBetoltese();
  }

  hirekBetoltese(): void {
    this.apiservice.getNews().subscribe(
      (data) => {
        this.hirek = data;
        console.log('Hírek:', this.hirek);
      },
      (error) => {
        console.error('Hiba történt a hírek betöltésekor', error);
      }
    );
  }

}
