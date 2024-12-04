import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-bejelentkezes',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BejelentkezesComponent {
  identifier: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  bejelentkezes() {
    const loginData = {
      identifier: this.identifier,
      password: this.password
    };

    this.authService.bejelentkezes(loginData); 
  }
}
