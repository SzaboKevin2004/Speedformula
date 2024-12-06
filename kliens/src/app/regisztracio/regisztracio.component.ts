import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-regisztracio',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisztracioComponent {
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  hiba: boolean = false;
  hibaUzenet: string = '';
  siker: boolean = false;
  sikerUzenet: string = '';
  keretMegjelenites: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  regisztracio() {
    this.hiba = false;
    this.hibaUzenet = '';

    const randomSzam = Math.floor(Math.random() * this.authService.getKepEleresLength());
    console.log(randomSzam)

    const regisztracioData = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      pfp_id: randomSzam
    };

    this.authService.regisztracio(regisztracioData).subscribe({
      next: () => {
        this.keretMegjelenites = false;
        this.siker = true;
        this.sikerUzenet = "Sikeres regisztráció!";
        console.log('Regisztráció sikeres');
        setTimeout(() => {
          this.router.navigate(['/']);
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
