import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

// this file is used to stop ppl accessing pages tht r auth sensitive by using the URL and other ways possibly
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // if u return true, then the router will know the protected route is accessible
    // if u return false, the router will deny to go there

    const isAuth = this.authService.getIsAuth();
    // if user isnt auth, then re-route them to login page
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    // will return true or false
    return isAuth;
  }

}
