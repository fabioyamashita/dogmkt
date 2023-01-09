import { BehaviorSubject, map, Observable } from 'rxjs';
import Cart from './checkout/models/cart';
import Dog from './collection/models/dog';

export interface State {
  dogsCollection: Dog[];
  cart: Cart;
}

const state: State = {
  dogsCollection: [],
  cart: new Cart(),
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

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
