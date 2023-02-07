import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { CartComponent } from '../cart/cart.component';

@Injectable()
export class CartGuard implements CanDeactivate<CartComponent> {
  constructor() {}

  canDeactivate(component: CartComponent): boolean {
    component.ngOnDestroy();
    return true;
  }
}
