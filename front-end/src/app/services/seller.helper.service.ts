import { Injectable } from '@angular/core';

import { Store } from 'src/app/app.store';

import Dog from '../models/dog';

@Injectable({
  providedIn: 'root',
})
export class SellerHelperService {
  constructor(private store: Store) {}

  getDogsBySeller(sellerId: string): Dog[] {
    let dogsCollection = this.store.value.dogsCollection;

    return dogsCollection.filter((dog) => (dog.sellerId = sellerId)) ?? [];
  }

  getSellerName(sellerId: string): string {
    let users = this.store.value.users;

    return users.find((user) => user.id == sellerId)?.name ?? '';
  }
}
