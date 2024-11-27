import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-kezdolap',
  standalone: true,
  imports: [],
  templateUrl: './kezdolap.component.html',
  styleUrl: './kezdolap.component.css'
})
export class KezdolapComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.video.nativeElement.muted = true;
  }
}
