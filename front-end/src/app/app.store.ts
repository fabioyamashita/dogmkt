import { BehaviorSubject, map, Observable } from 'rxjs';

export interface State {
  // todolist: Task[];
}

const state: State = {
  // todolist:[];
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value(): State {
    return this.subject.value;
  }

  //   public getTodoList$(): Observable<Task[]> {
  //     return this.store.pipe(map(store => store.todolist));
  //   }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
