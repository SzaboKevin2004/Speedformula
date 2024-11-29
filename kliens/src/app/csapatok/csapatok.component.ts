import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-csapatok',
  standalone: true,
  imports: [ FooterComponent ],
  templateUrl: './csapatok.component.html',
  styleUrl: './csapatok.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CsapatokComponent {

}
