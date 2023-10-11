import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'infinite-scroll';
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Code to handle resize
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    // Code to handle scroll
  }
}
