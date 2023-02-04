import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CollectionService } from 'src/app/services/collection.service';
import Dog from 'src/app/models/dog';
import { Store } from 'src/app/app.store';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
})
export class SellerProfileComponent {
  constructor(
    private collectionService: CollectionService,
    private store: Store,
    private localStorageUtils: LocalStorageUtils,
    private activatedRoute: ActivatedRoute
  ) {}

  public dogs!: Dog[];
  user!: any;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: ({ dogs }) => (this.dogs = dogs),
      error: (err: Error) => console.error(err),
    });

    this.user = this.store.value.users.find(
      (user) => user.id == parseInt(this.localStorageUtils.getUserId())
    );
  }

  searchCollection(event: any): void {
    this.collectionService.getCollection.subscribe({
      next: (dogs: Dog[]) =>
        (this.dogs = dogs.filter(
          (dog) =>
            dog.name?.toUpperCase().includes(event.toString().toUpperCase()) &&
            dog.sellerId == this.user.id
        )),
    });
  }
}
