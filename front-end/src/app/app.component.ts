import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { CollectionService } from './services/collection.service';
import { CheckoutService } from './services/checkout.service';
import { UserService } from './services/user.service';
import { LocalStorageUtils } from './utils/localStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-end';

  constructor(
    private checkoutService: CheckoutService,
    private collectionService: CollectionService,
    private userService: UserService,
    private localStorageUtils: LocalStorageUtils
  ) {}

  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.checkoutService
      .getCart(parseInt(this.localStorageUtils.getUserId()))
      .subscribe();
    this.subscription = this.collectionService.getCollection.subscribe();
    this.subscription = this.userService.getUsers.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
