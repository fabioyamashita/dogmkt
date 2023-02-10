import { RoutesService } from 'src/app/services/routes.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageUtils } from '../utils/localStorage';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private localStorageUtils: LocalStorageUtils,
    private routesService: RoutesService
  ) {}

  token: string = this.localStorageUtils.getToken() ?? '';

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.token) {
      this.routesService.navigateToLogin();
    }

    return true;
  }
}
