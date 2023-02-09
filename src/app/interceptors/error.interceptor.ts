import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { LocalStorageUtils } from '../utils/localStorage';
import { NavigationUtils } from '../utils/navigationUtils';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private localStorageUtils: LocalStorageUtils,
    private navigationUtils: NavigationUtils
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.localStorageUtils.removeCredentials();
            this.navigationUtils.navigateToLogin();
          }
        }

        return throwError(() => error);
      })
    );
  }
}
