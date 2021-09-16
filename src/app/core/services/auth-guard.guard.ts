import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authentication.service';
import { Logger } from './logger.service';

const log = new Logger('AuthGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authSvc.isLoggedIn().then(session => {
        log.info('Can access the page? : ', session);
        if (session === false) {
          this.show403Error();
          return false;
        } else {
          return true;
        }
      });
  }

  private show403Error(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        nav_error: '403'
      }
    };
    this.router.navigate(['navigationError'], navigationExtras);
  }

}
