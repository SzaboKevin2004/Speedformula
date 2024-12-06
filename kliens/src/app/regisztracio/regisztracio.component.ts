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

  constructor(private authService: AuthService, private router: Router) {}

  regisztracio() {
  

    if (!this.first_name ||!this.last_name ||!this.username ||!this.email ||!this.password ||!this.confirmPassword) {
      this.hiba = true;
      this.hibaUzenet = "Minden mező kitöltése kötelező!";
      return;
    }

    const regisztracioData = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

  
    this.authService.regisztracio(regisztracioData).subscribe({
      next: () => {
        console.log('Regisztráció sikeres');
        this.router.navigate(['/bejelentkezes']);
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
