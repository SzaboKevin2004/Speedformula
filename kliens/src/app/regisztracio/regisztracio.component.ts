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
  uresmezo: boolean = false;
  elterojelszo: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  regisztracio() {
    
    if (this.password !== this.confirmPassword) {
      this.hiba = true;
      this.elterojelszo = true;
      return;
    }

    if (!this.first_name ||!this.last_name ||!this.username ||!this.email ||!this.password ||!this.confirmPassword) {
      this.hiba = true;
      this.uresmezo = true;
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

  
    this.authService.regisztracio(regisztracioData);
  }
}
