//Regisztráció viselkedéséért, működéséért felelős ts
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule} from '@angular/router';

@Component({
    selector: 'app-regisztracio',
    imports: [RouterModule, FormsModule, CommonModule],
    templateUrl: './regisztracio.component.html',
    styleUrls: ['./regisztracio.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RegisztracioComponent {
  felhasznalonev: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';
  keretMegjelenites: boolean = true;
  jelszoLathatoE: boolean = false;
  jelszoLathatoE2: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // jelszó láthatóságot állítja. Alapértelmezetten hamis érték, ha igaz értéket kap akkor láthatóvá válik a jelszó a jelszó beírásnál.
  jelszoLathatosag(){
    this.jelszoLathatoE =!this.jelszoLathatoE;
  }
  jelszoLathatosag2(){
    this.jelszoLathatoE2 =!this.jelszoLathatoE2;
  }
  
  // regisztráció meghívása, regisztrációs adatok (változók) objektumba helyezése, majd küldése az AuthService onnan pedig a backendnek
  regisztracio() {
    this.hiba = false;
    this.hibaUzenet = '';

    const regisztracioData = {
      felhasznalonev: this.felhasznalonev,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password
    };

    this.authService.regisztracio(regisztracioData).subscribe({
      next: () => {
        this.keretMegjelenites = false;
        this.siker = true;
        this.sikerUzenet = "Sikeres regisztráció!";
        //console.log('Regisztráció sikeres');
        setTimeout(() => {
          this.router.navigate(['/bejelentkezes']);
        }, 1500);
      },
      error: (err) => {
        this.hiba = true;
        if (err.error?.message) {
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = "Ismeretlen hiba történt a regisztráció során!";
        }
      }
    });
  }
}
