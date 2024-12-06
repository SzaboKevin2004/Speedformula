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

  constructor(private authService: AuthService, private router: Router) {}

  bejelentkezes() {
    
    if (!this.identifier || !this.password) {
      this.hiba = true;
      this.hibaUzenet = 'Mindkét mező kitöltése kötelező!';
      return;
    }

    const loginData = {
      identifier: this.identifier,
      password: this.password
    };

    this.authService.bejelentkezes(loginData).subscribe({
      next: (response) => {
        console.log('Bejelentkezés sikeres', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
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

