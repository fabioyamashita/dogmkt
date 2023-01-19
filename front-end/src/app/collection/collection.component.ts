import { UserService } from './../services/user.service';
import { CollectionService } from './../services/collection.service';
import { Subscription } from 'rxjs';
import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageUtils } from '../utils/localStorage';

@Component({
  selector: 'app-collection',
  template: '<router-outlet></router-outlet>',
})
export class CollectionComponent implements OnInit, OnDestroy {
  constructor(
    private checkoutService: CheckoutService,
    private localStorageUtils: LocalStorageUtils,
    private collectionService: CollectionService,
    private userService: UserService
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
