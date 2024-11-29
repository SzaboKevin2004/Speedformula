import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-hirek',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './hirek.component.html',
  styleUrl: './hirek.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HirekComponent {

}
