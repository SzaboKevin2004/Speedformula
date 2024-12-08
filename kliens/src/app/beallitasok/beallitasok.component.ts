import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beallitasok',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beallitasok.component.html',
  styleUrl: './beallitasok.component.css'
})
export class BeallitasokComponent {
  fiok: boolean = true;
  profil: boolean = false;
  tema: boolean = false;
  vilagos: boolean = false;
  sotet: boolean = true;
  voros: boolean = false;
  teljesNev: boolean = true;

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

  vilagosMegjelenites() {
    this.vilagos = true;
    this.sotet = false;
    this.voros = false;
  }

  sotetMegjelenites() {
    this.vilagos = false;
    this.sotet = true;
    this.voros = false;
  }

  vorosMegjelenites() {
    this.vilagos = false;
    this.sotet = false;
    this.voros = true;
  }

  teljesNevMegjelenites() {
    this.teljesNev = !this.teljesNev;
  }
}
