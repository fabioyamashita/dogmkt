import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../app.store';
import { BaseService } from './base.service';

import Cart from 'src/app/models/cart';
import Purchase from '../models/purchase';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends BaseService {
  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  getCart = (userId: number): Observable<Cart> =>
    this.http
      .get<Cart>(
        this.UrlServiceV1 + 'carts/' + userId,
        super.getAuthHttpHeaders()
      )
      .pipe(
        tap((next) => {
          this.store.set('cart', next);
        })
      );

  updateCart = (cart: Cart): Observable<Cart> =>
    this.http
      .put<Cart>(
        this.UrlServiceV1 + 'carts/' + cart.id,
        cart,
        super.getAuthHttpHeaders()
      )
      .pipe(tap((next) => this.store.set('cart', next)));

  createCart = (cart: Cart): Observable<Cart> =>
    this.http
      .post<Cart>(this.UrlServiceV1 + 'carts', cart, super.getAuthHttpHeaders())
      .pipe(tap((next) => this.store.set('cart', next)));

  getPurchases = (): Observable<Purchase> =>
    this.http
      .get<Purchase>(
        this.UrlServiceV1 + 'purchases',
        super.getAuthHttpHeaders()
      )
      .pipe(tap((next) => this.store.set('purchases', next)));

  getPurchaseById = (id: number): Observable<Purchase> =>
    this.http.get<Purchase>(
      this.UrlServiceV1 + 'purchases/' + id,
      super.getAuthHttpHeaders()
    );

  createPurchase = (purchase: Purchase): Observable<Purchase> =>
    this.http
      .post<Purchase>(
        this.UrlServiceV1 + 'purchases',
        purchase,
        super.getAuthHttpHeaders()
      )
      .pipe(tap((next) => this.store.set('purchases', next)));
}
