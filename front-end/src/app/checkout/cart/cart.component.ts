import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'src/app/app.store';
import { CheckoutService } from './../services/checkout.services';

import Cart from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private checkoutService: CheckoutService, private store: Store) {}

  cart$: Observable<Cart> | undefined;

  ngOnInit(): void {
    this.cart$ = this.store.getCart$();
  }
}
