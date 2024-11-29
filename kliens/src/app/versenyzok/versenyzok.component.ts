import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-versenyzok',
  standalone: true,
  imports: [ FooterComponent ],
  templateUrl: './versenyzok.component.html',
  styleUrl: './versenyzok.component.css',
  encapsulation: ViewEncapsulation.None
})
export class VersenyzokComponent {

}
