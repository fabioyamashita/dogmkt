import { BehaviorSubject, map, Observable } from 'rxjs';
import Dog from './models/dog';

export interface State {
  dogsCollection: Dog[];
}

const state: State = {
  dogsCollection: [],
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

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
