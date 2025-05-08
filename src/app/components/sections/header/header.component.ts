import { Component, inject } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  app = inject(AppComponent);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userId: string = '';

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let current = this.route.root;

      while (current.firstChild) {
        current = current.firstChild;
        const uid = current.snapshot.paramMap.get('uid');
        if (uid) {
          this.userId = uid;
        }
      }
    });
  }
}
