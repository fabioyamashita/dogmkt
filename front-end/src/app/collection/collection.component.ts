import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from '../utils/localStorage';

@Component({
  selector: 'app-collection',
  template: '<router-outlet></router-outlet>',
})
export class CollectionComponent implements OnInit {
  constructor(
    private checkoutService: CheckoutService,
    private localStorageUtils: LocalStorageUtils
  ) {}

  ngOnInit(): void {
    // this.checkoutService
    //   .getCart(parseInt(this.localStorageUtils.getUserId()))
    //   .subscribe();
  }
}
