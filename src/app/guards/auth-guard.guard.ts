import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const sessionService = inject(SessionService);

  if (!sessionService.getSession() && state.url.startsWith('/starships')) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  else return true;
};