import { CheckoutService } from './../../checkout/services/checkout.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from 'src/app/app.store';
import DogCart from 'src/app/checkout/models/dogCart';
import Dog from 'src/app/collection/models/dog';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dog }) => (this.dog = dog));
  }

  dog!: Dog;
  currentQuantity: number = 1;

  showDogInfo: boolean = true;
  showDogDetails: boolean = false;

  onMoreInfoChange(event: any): void {
    if (event.target.value == 'dog-info') {
      this.showDogInfo = true;
      this.showDogDetails = false;
    } else if (event.target.value == 'dog-details') {
      this.showDogInfo = false;
      this.showDogDetails = true;
    }
  }

  // Add to Cart
  addItemToCart(): void {
    const dogCart: DogCart = {
      dog: this.dog,
      quantity: this.currentQuantity,
    };

    this.checkoutService.updateCart(dogCart).subscribe();
  }
}
