import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bejelentkezes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bejelentkezes.component.html',
  styleUrl: './bejelentkezes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BejelentkezesComponent {
  constructor(private authService: AuthService, private router: Router) {}

  bejelentkezes() {
    this.authService.bejelentkezes(); 
    this.router.navigate(['/']);

}
}
