import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  router = inject(Router);
  private location = inject(Location);


  navigateTo(route: string) { this.router.navigate([`${route}`]); }
  backBtn() { this.location.back(); }
}
