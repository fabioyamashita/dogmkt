import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CollectionService } from 'src/app/services/collection.service';
import Dog from '../../models/dog';

@Injectable()
export class CollectionResolve implements Resolve<Dog[]> {
  constructor(private collectionService: CollectionService) {}

  resolve(): Observable<Dog[]> {
    return this.collectionService.getCollection;
  }
}
