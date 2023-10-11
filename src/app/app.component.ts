import { Component, HostListener, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'infinite-scroll';
  posts: Post[] = [];

  // Reference to the post elements in the DOM
  @ViewChildren('post') postElements!: QueryList<ElementRef>;

  constructor(private http: HttpClient) { }

  // Handle window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    console.log('Window resized');
    // Adjust your calculations and thresholds based on the device's screen size
  }

  // Handle window scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    console.log('Window scrolled');
    // Check if the user has scrolled to the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log('Reached bottom of page, fetching more posts');
      // Fetch more posts
      this.fetchPosts();
    }
  }

  ngOnInit() {
    console.log('AppComponent initialized');
    this.onResize();
    this.fetchPosts();
  }

  // Fetch posts from the JSONPlaceholder API
  fetchPosts() {
    console.log('Fetching posts');
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').subscribe(posts => {
      console.log('Posts fetched', posts);
      // Add the fetched posts to your existing posts
      this.posts = [...this.posts, ...posts];
    });
  }

  ngAfterViewInit() {
    console.log('View initialized');
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.5, 1] // 0, 50%, and 100% visibility
    };

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.5) {
          console.log('Post is 50% visible', entry.target);
          // Code to handle 50% visibility
        }
      });
    }, options);

    this.postElements.forEach(postElement => {
      console.log('Starting to observe post', postElement.nativeElement);
      observer.observe(postElement.nativeElement);
    });
  }
}
