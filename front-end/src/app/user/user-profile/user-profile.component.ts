import { CheckoutService } from 'src/app/services/checkout.service';
import { Component, Input, OnInit } from '@angular/core';

import { Store } from 'src/app/app.store';
import Purchase from 'src/app/models/purchase';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private store: Store,
    private localStorageUtils: LocalStorageUtils,
    private checkoutService: CheckoutService
  ) {}

  user: User | undefined;
  purchases: Purchase[] | undefined;

  ngOnInit(): void {
    this.store.getUser$().subscribe({
      next: (users) =>
        (this.user = users.find(
          (user) => user.id == parseInt(this.localStorageUtils.getUserId())
        )),
    });

    this.checkoutService.getPurchases().subscribe({
      next: () => {
        this.store.getPurchases$().subscribe({
          next: (purchases) => {
            this.purchases = purchases.filter(
              (purchase) =>
                purchase.userId == parseInt(this.localStorageUtils.getUserId())
            );
          },
        });
      },
    });
  }
}
