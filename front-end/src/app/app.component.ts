import { CollectionService } from './collection/services/collection.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from './app.store';
import { CheckoutService } from './checkout/services/checkout.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-end';

  constructor(
    private checkoutService: CheckoutService,
    private collectionService: CollectionService
  ) {}

  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.checkoutService.getCart.subscribe();
    this.subscription = this.collectionService.getAll.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
