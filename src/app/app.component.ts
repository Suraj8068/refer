import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSidebar = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/' || this.router.url === '/login') {
          this.showSidebar = false; // Login Page pe Sidebar nahi dikhega
        } else {
          this.showSidebar = true; // Baaki Sab Pages pe Sidebar dikhega
        }
      }
    });
  }
}
