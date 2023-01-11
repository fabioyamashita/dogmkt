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
  constructor(private store: Store) {}

  cart$: Observable<Cart> | undefined;

  ngOnInit(): void {
    this.cart$ = this.store.getCart$();
  }
}
