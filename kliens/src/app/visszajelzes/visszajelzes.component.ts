//Visszajelzés viselkedéséért, működéséért felelős ts
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { VisszajelzesService } from '../services/visszajelzes.service';

@Component({
    selector: 'app-visszajelzes',
    imports: [RouterModule, FormsModule, CommonModule],
    templateUrl: './visszajelzes.component.html',
    styleUrl: './visszajelzes.component.css',
    encapsulation: ViewEncapsulation.None
})

export class VisszajelzesComponent {

  email: string | undefined = undefined;
  message: string = '';
  keretMegjelenites: boolean = true;
  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';
  lekertEmail: string | undefined = undefined;
  emailBeiras: boolean = true;

  constructor( private router: Router, private authservice: AuthService , private visszajelzesService: VisszajelzesService ) {}

  uzenetKuldes() {
    this.hiba = false;
    this.siker = false;
    this.hibaUzenet = '';
    this.sikerUzenet = '';

    if (this.email == undefined) {
      this.email = this.lekertEmail;
    }

    const visszajelzesData = {
      email: this.email,
      message: this.message
    };

    this.visszajelzesService.visszajelzes(visszajelzesData)
      .subscribe({
        next: () => {
          this.keretMegjelenites = false;
          this.siker = true;
          this.sikerUzenet = "Köszönjük az üzenetet!";
          setTimeout(() => {
            this.siker = false;
            this.sikerUzenet = '';
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (err) => {
          this.hiba = true;
          if (err.error?.message) {
            this.hibaUzenet = err.error.message;
          } else {
            this.hibaUzenet = "Hiba történt az üzenet küldésekor!";
          }
          console.error('Hiba történt:', err);
        }
      });
  }

  profilLekeres() {
    this.authservice.profilLekeres().subscribe({
      next: (response) => {
        const profilAdatok = response.felhasználó;
        this.lekertEmail = profilAdatok.email;
        if (this.lekertEmail !== undefined) {
          this.emailBeiras = false;
        }
      },
      error: (error) => {
        console.error('Hiba történt a profil lekérésénél:', error);
      }
    });
  }
  ngOnInit() {
    this.hiba = false;
    this.siker = false;
    this.hibaUzenet = '';
    this.sikerUzenet = '';
    this.keretMegjelenites = true;
    this.authservice.felhBejelentkezettE$.subscribe(bejelentkezettE => {
      if (bejelentkezettE) {
        this.profilLekeres();
      }
    });
  }
}
