import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../app.store';

@Injectable({
  providedIn: 'root',
})
export class DogmktService {
  constructor(private http: HttpClient, private store: Store) {}

  // getTodoList$: Observable<Task[]> = this.http
  //   .get<Task[]>('url')
  //   .pipe(tap((next) => this.store.set('todolist', next)));
}
