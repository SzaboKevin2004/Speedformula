import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-regisztracio',
  standalone: true,
  imports: [RouterModule, FormsModule],
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

  constructor(private authService: AuthService, private router: Router) {}

  regisztracio() {
    
    if (this.password !== this.confirmPassword) {
      alert('A jelszavak nem egyeznek!');
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
