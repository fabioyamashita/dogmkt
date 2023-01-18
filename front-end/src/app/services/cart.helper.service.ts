import { Injectable } from '@angular/core';

import { Store } from 'src/app/app.store';

import Cart from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartHelperService {
  constructor(private store: Store) {}

  // updateCartSummary(updatedCart: Cart, dogPrice: number): Cart {
  //   let cart = updatedCart;
  //   let updatedSummary: number = 0;

  //   cart.dogs.forEach((dog) => (updatedSummary += dog.quantity * dogPrice));

  //   let updatedTotal: number = updatedSummary - cart.discount;

  //   cart.summary = updatedSummary;
  //   cart.total = updatedTotal;

  //   return cart;
  // }
}
