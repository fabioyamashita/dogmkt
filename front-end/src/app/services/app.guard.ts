import { NavigationUtils } from 'src/app/utils/navigationUtils';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from '../utils/localStorage';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private localStorageUtils: LocalStorageUtils,
    private navigationUtils: NavigationUtils
  ) {}

  token: string = this.localStorageUtils.getToken() ?? '';

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.token) {
      this.navigationUtils.navigateToLogin();
    }

    return true;
  }
}
