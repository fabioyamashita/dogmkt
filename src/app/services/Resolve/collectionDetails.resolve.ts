import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';

import Dog from '../../models/dog';

@Injectable()
export class CollectionDetailsResolve implements Resolve<Dog> {
  constructor(private collectionService: CollectionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Dog> {
    return this.collectionService.getById(route.params['id']);
  }
}
