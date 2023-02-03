import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { NavigationUtils } from 'src/app/utils/navigationUtils';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(
    private localStorageUtils: LocalStorageUtils,
    private navigationUtils: NavigationUtils
  ) {}

  canActivate() {
    if (this.localStorageUtils.getToken()) {
      this.navigationUtils.navigateToCollection();
    }

    return true;
  }
}
