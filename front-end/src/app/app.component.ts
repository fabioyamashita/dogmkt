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

  constructor(private checkoutService: CheckoutService) {}

  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.checkoutService.getCart.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
