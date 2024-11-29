import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-tortenet',
  standalone: true,
  imports: [ FooterComponent ],
  templateUrl: './tortenet.component.html',
  styleUrl: './tortenet.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TortenetComponent {

}
