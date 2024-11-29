import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-elo',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './elo.component.html',
  styleUrl: './elo.component.css',
  encapsulation: ViewEncapsulation.None
})
export class EloComponent {

}
