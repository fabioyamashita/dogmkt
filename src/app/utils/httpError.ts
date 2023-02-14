import { RoutesService } from '../services/routes.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpError {
  constructor(private routesService: RoutesService) {}

  process(errStatus: string): void {
    if (errStatus == '401') {
      this.routesService.navigateToLogin();
    }
  }
}
