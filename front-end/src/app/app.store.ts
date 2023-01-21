import { BehaviorSubject, map, Observable } from 'rxjs';

import Cart from './models/cart';
import Dog from './models/dog';
import Purchase from './models/purchase';
import User from './models/user';

export interface State {
  dogsCollection: Dog[];
  cart: Cart;
  users: User[];
  purchases: Purchase[];
}

const state: State = {
  dogsCollection: [],
  cart: new Cart(),
  users: [],
  purchases: [],
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value(): State {
    return this.subject.value;
  }

  public getDogsCollection$(): Observable<Dog[]> {
    return this.store.pipe(map((store) => store.dogsCollection));
  }

  public getCart$(): Observable<Cart> {
    return this.store.pipe(map((store) => store.cart));
  }

  public getUser$(): Observable<User[]> {
    return this.store.pipe(map((store) => store.users));
  }

  public getPurchases$(): Observable<Purchase[]> {
    return this.store.pipe(map((store) => store.purchases));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
