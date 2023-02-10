import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { RoutesService } from 'src/app/services/routes.service';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(
    private localStorageUtils: LocalStorageUtils,
    private routesService: RoutesService
  ) {}

  canActivate() {
    if (this.localStorageUtils.getToken()) {
      this.routesService.navigateToCollection();
    }

    return true;
  }
}
