import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-kezdolap',
    imports: [RouterModule, FooterComponent],
    templateUrl: './kezdolap.component.html',
    styleUrl: './kezdolap.component.css'
})
export class KezdolapComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.video.nativeElement.muted = true;
  }
}
