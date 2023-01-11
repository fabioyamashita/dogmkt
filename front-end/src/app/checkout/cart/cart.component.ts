import { CollectionService } from 'src/app/collection/services/collection.service';
import { CheckoutService } from './../services/checkout.services';
import { CheckoutHelperService } from './../services/checkout.helper.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from 'src/app/app.store';

import Cart from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private store: Store,
    private checkoutHelperService: CheckoutHelperService,
    private checkoutService: CheckoutService,
    private collectionService: CollectionService
  ) {}

  cart$: Observable<Cart> | undefined;

  ngOnInit(): void {
    this.cart$ = this.store.getCart$();
  }

  deleteFromCart(event: any): void {
    const id = event.target.closest('.product-info').id;
    let updatedDog = this.checkoutHelperService.deleteDogInCart(id);

    let updatedCart: any = this.store.value.cart;

    this.collectionService.updateDog(updatedDog).subscribe({
      complete: () => this.checkoutService.updateCart(updatedCart).subscribe(),
    });
  }
}
