import { Injectable } from '@angular/core';

import { Store } from 'src/app/app.store';

import Dog from 'src/app/collection/models/dog';
import Cart from '../models/cart';
import DogCart from '../models/dogCart';

@Injectable({
  providedIn: 'root',
})
export class CheckoutHelperService {
  constructor(private store: Store) {}

  updateCartStore(dogCart: DogCart): Cart {
    let cart = this.store.value.cart;

    dogCart.dog.availableQuantity -= dogCart.quantity;
    const dogIndex = cart.dogs.findIndex((dog) => dog.dog.id == dogCart.dog.id);

    if (dogIndex == -1) cart.dogs.push(dogCart);
    else cart.dogs[dogIndex].quantity += dogCart.quantity;

    cart = this.updateTotalStore(cart);

    this.store.set('cart', cart);

    return cart;
  }

  updateDogInCollection(dogCart: DogCart): Dog {
    const quantityOnCart = dogCart.quantity;

    let dogsCollection = this.store.value.dogsCollection;

    const dogIndexCollection = dogsCollection.findIndex(
      (dog) => dog.id == dogCart.dog.id
    );

    dogsCollection[dogIndexCollection].availableQuantity -= quantityOnCart;

    this.store.set('dogsCollection', dogsCollection);

    return dogsCollection[dogIndexCollection];
  }

  updateTotalStore(updatedCart: Cart): Cart {
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
