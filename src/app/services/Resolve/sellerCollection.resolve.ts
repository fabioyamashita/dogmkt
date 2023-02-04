import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CollectionService } from 'src/app/services/collection.service';
import Dog from '../../models/dog';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Injectable()
export class SellerCollectionResolve implements Resolve<Dog[]> {
  constructor(
    private collectionService: CollectionService,
    private localStorageUtils: LocalStorageUtils
  ) {}

  resolve(): Observable<Dog[]> {
    return this.collectionService.getSellerCollection(
      parseInt(this.localStorageUtils.getUserId())
    );
  }
}
