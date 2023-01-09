import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../../app.store';

import Cart from 'src/app/checkout/models/cart';
import DogCart from '../models/dogCart';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient, private store: Store) {}

  protected UrlServiceV1: string = 'http://localhost:3000/';

  getCart: Observable<Cart> = this.http
    .get<Cart>(this.UrlServiceV1 + 'cart')
    .pipe(tap((next) => this.store.set('cart', next)));

  updateCart(dogCart: DogCart): Observable<Cart> {
    let cart = this.store.value.cart;
    const dogIndex = cart.dogs.findIndex((dog) => dog.dog.id == dogCart.dog.id);

    if (dogIndex == -1) cart.dogs.push(dogCart);
    else cart.dogs[dogIndex].quantity += dogCart.quantity;

    cart = this.updateTotal(cart);

    this.store.set('cart', cart);

    return this.http.put<Cart>(this.UrlServiceV1 + 'cart', cart);
  }

  updateTotal(updatedCart: Cart): Cart {
    let updatedSummary: number = 0;

    updatedCart.dogs.forEach(
      (dog) => (updatedSummary += dog.quantity * dog.dog.price)
    );

    let updatedTotal: number = updatedSummary - updatedCart.discount;

    let cart = this.store.value.cart;
    cart.summary = updatedSummary;
    cart.total = updatedTotal;

    return cart;
  }
}
