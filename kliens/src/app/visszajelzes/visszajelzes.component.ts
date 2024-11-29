import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visszajelzes',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './visszajelzes.component.html',
  styleUrl: './visszajelzes.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class VisszajelzesComponent {

}
