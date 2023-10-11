import { Component, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'infinite-scroll';

  @ViewChildren('post') posts!: QueryList<ElementRef>;

  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Code to handle resize
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Code to handle scroll
  }

  ngAfterViewInit() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.5, 1] // 0, 50%, and 100% visibility
    };

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.5) {
          // Code to handle 50% visibility
        }
      });
    }, options);

    this.posts.forEach(post => {
      observer.observe(post.nativeElement);
    });
  }
}
