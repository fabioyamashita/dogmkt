import { CollectionService } from 'src/app/services/collection.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import Dog from '../models/dog';

@Injectable()
export class CollectionResolve implements Resolve<Dog> {
  constructor(private collectionService: CollectionService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.collectionService.getById(route.params['id']);
  }
}
