import { UserService } from './../services/user.service';
import { CollectionService } from './../services/collection.service';
import { Subscription } from 'rxjs';
import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageUtils } from '../utils/localStorage';
import { HttpError } from '../utils/httpError';

@Component({
  selector: 'app-collection',
  template: '<router-outlet></router-outlet>',
})
export class CollectionComponent implements OnInit, OnDestroy {
  constructor(
    private checkoutService: CheckoutService,
    private localStorageUtils: LocalStorageUtils,
    private collectionService: CollectionService,
    private userService: UserService,
    private httpError: HttpError
  ) {}

  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.checkoutService
      .getCart(parseInt(this.localStorageUtils.getUserId()))
      .subscribe({
        error: (err) => {
          this.httpError.process(err.status);
        },
      });

    this.subscription = this.collectionService.getCollection.subscribe({
      error: (err) => {
        this.httpError.process(err.status);
      },
    });

    this.subscription = this.userService.getUsers.subscribe({
      error: (err) => {
        this.httpError.process(err.status);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
