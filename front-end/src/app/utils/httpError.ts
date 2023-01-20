import { NavigationUtils } from './navigationUtils';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpError {
  constructor(private navigationUtils: NavigationUtils) {}

  process(errStatus: string): void {
    if (errStatus == '401') {
      this.navigationUtils.navigateToLogin();
    }
  }
}
