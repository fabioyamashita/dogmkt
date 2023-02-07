import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { CheckoutService } from './services/checkout.service';
import { UserService } from './services/user.service';
import { LocalStorageUtils } from './utils/localStorage';
import { HttpError } from './utils/httpError';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-end';

  constructor(
    private checkoutService: CheckoutService,
    private userService: UserService,
    private localStorageUtils: LocalStorageUtils,
    private httpError: HttpError
  ) {}

  subscriptionCart: Subscription | undefined;
  subscriptionCollection: Subscription | undefined;
  subscriptionUser: Subscription | undefined;

  ngOnInit(): void {
    this.subscriptionCart = this.checkoutService
      .getCart(parseInt(this.localStorageUtils.getUserId()))
      .subscribe({
        error: (err) => {
          this.httpError.process(err.status);
        },
      });

    this.subscriptionUser = this.userService.getUsers.subscribe({
      error: (err) => {
        this.httpError.process(err.status);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptionCart?.unsubscribe();
    this.subscriptionUser?.unsubscribe();
  }
}
