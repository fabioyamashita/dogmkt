import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/app/app.store';
import Dog from 'src/app/models/dog';
import { DogmktService } from 'src/app/services/dogmkt.service';

@Component({
  selector: 'app-dogs-collection',
  templateUrl: './dogs-collection.component.html',
  styleUrls: ['./dogs-collection.component.css'],
})
export class DogsCollectionComponent {
  constructor(private dogmktService: DogmktService, private store: Store) {}

  dogsCollection$: Observable<Dog[]> | undefined;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.dogsCollection$ = this.store.getDogsCollection$();
    this.subscription = this.dogmktService.getDogsCollection$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
