import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from '../utils/localStorage';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageUtils: LocalStorageUtils
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.localStorageUtils.getToken()) {
      this.router.navigate(['/account/login']);
    }

    return true;
  }
}
