import DogCart from 'src/app/models/dogCart';
import { Injectable } from '@angular/core';

import { Store } from 'src/app/app.store';

import Dog from '../models/dog';

@Injectable({
  providedIn: 'root',
})
export class CollectionHelperService {
  constructor(private store: Store) {}

  // getDogCartInfo(dogId: string): any {
  //   let cart = this.store.value.cart;
  //   let dogsCollection = this.store.value.dogsCollection;

  //   let dogCartInfo: any;

  //   return dogsCollection.find((dog) => dog.id == dogId)!;
  // }
}
