import { BehaviorSubject, map, Observable } from 'rxjs';
import Cart from './models/cart';
import Dog from './models/dog';
import DogCartDetailed from './models/dogCartDetailed';
import User from './models/user';

export interface State {
  dogsCollection: Dog[];
  cart: Cart;
  users: User[];
  dogCartDetailed: DogCartDetailed;
}

const state: State = {
  dogsCollection: [],
  cart: new Cart(),
  users: [],
  dogCartDetailed: new DogCartDetailed(),
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

  public getDogCartDetailed$(): Observable<DogCartDetailed> {
    return this.store.pipe(map((store) => store.dogCartDetailed));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
