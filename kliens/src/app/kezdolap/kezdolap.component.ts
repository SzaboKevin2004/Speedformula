// Kezdőlap viselkedéséért felelős ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-kezdolap',
    imports: [RouterModule, FooterComponent],
    templateUrl: './kezdolap.component.html',
    styleUrl: './kezdolap.component.css'
})
export class KezdolapComponent {
}