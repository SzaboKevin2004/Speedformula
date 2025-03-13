//Bejelentkezés viselkedéséért, működéséért felelős ts
import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule} from '@angular/router';

@Component({
    selector: 'app-bejelentkezes',
    imports: [RouterModule, FormsModule, CommonModule],
    templateUrl: './bejelentkezes.component.html',
    styleUrl: './bejelentkezes.component.css',
    encapsulation: ViewEncapsulation.None
})
export class BejelentkezesComponent {
  identifier: string =  '';
  felhasznalonev: string = '';
  email: string = '';
  password: string = '';
  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';
  keretMegjelenites: boolean = true;
  jelszoLathatoE: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  // jelszó láthatóságot állítja. Alapértelmezetten hamis érték, ha igaz értéket kap akkor láthatóvá válik a jelszó a jelszó beírásnál.
  jelszoLathatosag(){
    this.jelszoLathatoE =!this.jelszoLathatoE;
  }
   // bejelentkezés meghívása, bejelentkezési adatok (változók) objektumba helyezése, majd küldése az AuthService onnan pedig a backendnek
  bejelentkezes() {
    this.hiba = false;
    this.hibaUzenet = '';

    // Felhasználó email-címének ellenőrzésének, ha van email cím, akkor az email címet helyezzük el változóban, ha nincs akkor a felhasználónevet
    if(this.identifier.includes('@')){
      this.email = this.identifier;
      this.felhasznalonev = '';
    } else {
      this.felhasznalonev = this.identifier;
      this.email = '';
    }

    // Objektum mely az AuthServicehez kerül küldésre
    const loginData = {
      felhasznalonev: this.felhasznalonev,
      email: this.email,
      password: this.password
    };

    this.authService.bejelentkezes(loginData).subscribe({
      next: (response) => {
        this.keretMegjelenites = false;
        this.siker = true;
        this.sikerUzenet = "Sikeres bejelentkezés!";
        console.log('Bejelentkezés sikeres', response);
        localStorage.setItem('token', response.token);
        this.authService.setFelhasznaloNev(response.username);
        this.authService.setPfpId(response.pfp);
        this.authService.setBejelentkezettE(true);
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }, 1500);
      },
      error: (err) => {
        this.hiba = true;
        if (err.error?.message) {
          this.hibaUzenet = err.error.message;
        } else {
          this.hibaUzenet = "Ismeretlen hiba történt a bejelentkezés során!";
        }
      }
    });

  }
}

