import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService = inject(AuthService);

  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuth) => {
      if (isAuth) router.navigate(['./sport/list']);
    }),
    map((isAuth) => !isAuth)
  );
};

export const publicCanMatch: CanMatchFn = (
  route: Route,
  urlSegments: UrlSegment[]
) => {
  return checkAuthStatus();
};

export const publicCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};
