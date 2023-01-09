import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../../app.store';

import Dog from '../models/dog';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private http: HttpClient, private store: Store) {}

  protected UrlServiceV1: string = 'http://localhost:3000/';

  getAll: Observable<Dog[]> = this.http
    .get<Dog[]>(this.UrlServiceV1 + 'dogs')
    .pipe(tap((next) => this.store.set('dogsCollection', next)));

  getById(id: string): Observable<Dog> {
    return this.http.get<Dog>(this.UrlServiceV1 + 'dogs' + '/' + id);
  }
}
