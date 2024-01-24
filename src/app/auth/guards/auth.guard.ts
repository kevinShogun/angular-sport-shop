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
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService = inject(AuthService);

  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuth) => {
      if (!isAuth) router.navigate(['./auth/login']);
    })
  );
};

export const authCanMatch: CanMatchFn = (
  route: Route,
  urlSegments: UrlSegment[]
) => {
  return checkAuthStatus();
};

export const authCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanMatchFn, CanActivateFn {
//   constructor( private authService: AuthService, private router: Router ) {}
//   private checkAuthStatus(): boolean | Observable<boolean> {
//     return this.authService.checkAuthentication().pipe( tap((isAuth) => { if (!isAuth) { this.router.navigate(['/auth/login']); } }) );
//   }
//   CanMatchFn( route: Route, state: RouterStateSnapshot): boolean | Observable<boolean> { return this.checkAuthStatus(); } }
//   CanActivateFn( route: Route, state: RouterStateSnapshot): boolean | Observable<boolean> { return this.checkAuthStatus(); } }
