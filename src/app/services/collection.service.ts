import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

import { BaseService } from 'src/app/services/base.service';
import { Store } from '../app.store';

import Dog from '../models/dog';

@Injectable({
  providedIn: 'root',
})
export class CollectionService extends BaseService {
  constructor(private http: HttpClient, private store: Store) {
    super();
  }

  getCollection: Observable<Dog[]> = this.http
    .get<Dog[]>(this.UrlServiceV1 + 'dogs', super.getAuthHttpHeaders())
    .pipe(tap((next) => this.store.set('dogsCollection', next)));

  getSellerCollection = (sellerId: number): Observable<Dog[]> =>
    this.http
      .get<Dog[]>(this.UrlServiceV1 + 'dogs', super.getAuthHttpHeaders())
      .pipe(
        map((dogs: Dog[]) => dogs.filter((dog) => dog.sellerId === sellerId))
      );

  getById = (id: number): Observable<Dog> =>
    this.http.get<Dog>(
      this.UrlServiceV1 + 'dogs' + '/' + id,
      super.getAuthHttpHeaders()
    );

  updateDog = (dog: Dog): Observable<Dog> =>
    this.http
      .put<Dog>(
        this.UrlServiceV1 + 'dogs/' + dog.id,
        dog,
        super.getAuthHttpHeaders()
      )
      .pipe(
        tap((next) => {
          const index = this.store.value.dogsCollection.findIndex(
            (dogColl) => dogColl.id == dog.id
          );
          let updatedDogCollection = this.store.value.dogsCollection;
          updatedDogCollection[index] = dog;

          this.store.set('dogsCollection', updatedDogCollection);
        })
      );

  createDog(newDog: Dog): Observable<Dog> {
    if (!newDog.pictureUrl)
      newDog.pictureUrl =
        'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80';

    return this.http
      .post<Dog>(this.UrlServiceV1 + 'dogs', newDog, super.getAuthHttpHeaders())
      .pipe(
        tap((next) => {
          let updatedDogCollection = this.store.value.dogsCollection;
          updatedDogCollection.push(newDog);
          this.store.set('dogsCollection', updatedDogCollection);
        })
      );
  }
}
