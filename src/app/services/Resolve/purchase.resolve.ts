import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { CheckoutService } from '../checkout.service';
import { Observable } from 'rxjs';

import Purchase from '../../models/purchase';

@Injectable()
export class PurchaseResolve implements Resolve<Purchase> {
  constructor(private checkoutService: CheckoutService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Purchase> {
    return this.checkoutService.getPurchaseById(parseInt(route.params['id']));
  }
}
