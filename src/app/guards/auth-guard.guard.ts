import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const sessionService = inject(SessionService);

  const session = sessionService.getSession();
  const user = sessionService.getUser();
  const uid = route.params['uid'];

  if (!session || !user) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if (user._id !== uid) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false  }

  if (state.url.includes('/create') && !user.premium && user.characters?.length >= 2) {
    alert('You need premium to create more than 2 characters.');
    router.navigate([`/${user._id}/dashboard`]);
    return false;
  }

  return true;
};