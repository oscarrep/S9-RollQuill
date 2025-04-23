import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  router = inject(Router);

  navigateTo(route: string) { this.router.navigate([`${route}`]); }
}
