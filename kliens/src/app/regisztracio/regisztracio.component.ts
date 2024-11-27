import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-regisztracio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './regisztracio.component.html',
  styleUrl: './regisztracio.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisztracioComponent {
  constructor(private authservice: AuthService, private router: Router) {}
  regisztracio() {
    this.authservice.regisztracio();
    this.authservice.bejelentkezes(); 
    this.router.navigate(['/']);
  }
}
