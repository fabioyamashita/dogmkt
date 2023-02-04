import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { CheckoutService } from 'src/app/services/checkout.service';
import { Store } from 'src/app/app.store';
import Purchase from 'src/app/models/purchase';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Injectable({ providedIn: 'root' })
export class PurchasesListResolve implements Resolve<Purchase[]> {
  constructor(
    private store: Store,
    private localStorageUtils: LocalStorageUtils,
    private checkoutService: CheckoutService
  ) {}

  resolve(): Observable<Purchase[]> {
    return new Observable<Purchase[]>((observer) => {
      this.checkoutService.getPurchases().subscribe({
        next: () => {
          this.store.getPurchases$().subscribe({
            next: (purchases) => {
              const filteredPurchases = purchases.filter(
                (purchase) =>
                  purchase.userId ==
                  parseInt(this.localStorageUtils.getUserId())
              );
              observer.next(filteredPurchases);
              observer.complete();
            },
            error: (err) => observer.error(err),
          });
        },
        error: (err) => observer.error(err),
      });
    });
  }
}
