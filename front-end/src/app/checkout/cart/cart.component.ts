import { Component, OnInit } from '@angular/core';

import { Store } from 'src/app/app.store';

import Cart from '../../models/cart';
import { SellerHelperService } from 'src/app/services/seller.helper.service';
import { CollectionService } from 'src/app/services/collection.service';
import { CheckoutService } from '../../services/checkout.services';
import { DogHelperService } from '../../services/dog.helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private store: Store,
    private dogHelperService: DogHelperService,
    private checkoutService: CheckoutService,
    private collectionService: CollectionService,
    public sellerHelperService: SellerHelperService
  ) {}

  cart: Cart | undefined;

  ngOnInit(): void {
    this.store.getCart$().subscribe({
      next: (cart) => (this.cart = cart),
    });
  }

  deleteFromCart(event: any): void {
    const id = event.target.closest('.product-info').id;
    let updatedDog = this.dogHelperService.deleteDogInCart(id);

    let updatedCart: any = this.store.value.cart;

    this.collectionService.updateDog(updatedDog).subscribe({
      complete: () => this.checkoutService.updateCart(updatedCart).subscribe(),
    });
  }
}
