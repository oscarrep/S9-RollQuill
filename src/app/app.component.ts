import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/sections/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RollQuill';
  router = inject(Router);
  navigateTo(route: string) { this.router.navigate([`${route}`]); }
  showHeader = true;

  constructor() {
    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/home';
    });
  }
}
