import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '../app.store';
import Dog from '../models/dog';

@Injectable({
  providedIn: 'root',
})
export class DogmktService {
  constructor(private http: HttpClient, private store: Store) {}

  protected UrlServiceV1: string = 'http://localhost:3000/';

  getDogsCollection$: Observable<Dog[]> = this.http
    .get<Dog[]>(this.UrlServiceV1 + 'dogs')
    .pipe(tap((next) => this.store.set('dogsCollection', next)));
}
