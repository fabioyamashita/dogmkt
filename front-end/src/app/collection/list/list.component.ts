import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from 'src/app/app.store';
import Dog from 'src/app/models/dog';
import { DogmktService } from 'src/app/services/dogmkt.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
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
