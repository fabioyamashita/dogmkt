import { Injectable } from '@angular/core';

import { Store } from 'src/app/app.store';

import Dog from 'src/app/models/dog';
import Cart from '../models/cart';
import DogCart from '../models/dogCart';

@Injectable({
  providedIn: 'root',
})
export class DogHelperService {
  constructor(private store: Store) {}

  updateCartStore(dogCart: DogCart): Cart {
    let cart = this.store.value.cart;

    dogCart.dog.availableQuantity! -= dogCart.quantity;
    const dogIndex = cart.dogs.findIndex((dog) => dog.dog.id == dogCart.dog.id);

    if (dogIndex == -1) cart.dogs.push(dogCart);
    else cart.dogs[dogIndex].quantity += dogCart.quantity;

    cart = this.updateTotalStore(cart);

    return cart;
  }

  updateDogInCollection(dogCart: DogCart): Dog {
    const quantityOnCart = dogCart.quantity;

    let dogsCollection = this.store.value.dogsCollection;

    const dogIndexCollection = dogsCollection.findIndex(
      (dog) => dog.id == dogCart.dog.id
    );

    dogsCollection[dogIndexCollection].availableQuantity! -= quantityOnCart;

    return dogsCollection[dogIndexCollection];
  }

  updateTotalStore(updatedCart: Cart): Cart {
    let updatedSummary: number = 0;

    updatedCart.dogs.forEach(
      (dog) => (updatedSummary += dog.quantity * dog.dog.price!)
    );

    let updatedTotal: number = updatedSummary - updatedCart.discount;

    let cart = this.store.value.cart;
    cart.summary = updatedSummary;
    cart.total = updatedTotal;

    return cart;
  }

  deleteDogInCart(id: string): Dog {
    let cart = this.store.value.cart;

    const index = cart.dogs.findIndex((dog) => dog.dog.id == id);
    const quantity = cart.dogs[index].quantity;

    cart.dogs.splice(index, 1);

    this.updateTotalStore(cart);

    // Update Dog in Collection
    let dogsCollection = this.store.value.dogsCollection;
    const dogIndexCollection = dogsCollection.findIndex((dog) => dog.id == id);

    dogsCollection[dogIndexCollection].availableQuantity! += quantity;

    return dogsCollection[dogIndexCollection];
  }
}
