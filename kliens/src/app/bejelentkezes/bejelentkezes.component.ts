import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BejelentkezesComponent {
  identifier: string = '';
  password: string = '';
  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';
  keretMegjelenites: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  bejelentkezes() {
    this.hiba = false;
    this.hibaUzenet = '';
    

    const loginData = {
      identifier: this.identifier,
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
          this.router.navigate(['/']);
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

