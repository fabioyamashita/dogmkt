import { CollectionService } from './../services/collection.service';
import { CheckoutHelperService } from './../../checkout/services/checkout.helper.service';
import { CheckoutService } from './../../checkout/services/checkout.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import DogCart from 'src/app/checkout/models/dogCart';
import Dog from 'src/app/collection/models/dog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private checkoutHelperService: CheckoutHelperService,
    private collectionService: CollectionService
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

    const dogUpdated =
      this.checkoutHelperService.updateDogInCollection(dogCart);
    const cartUpdated = this.checkoutHelperService.updateCartStore(dogCart);

    this.collectionService.updateDog(dogUpdated).subscribe();
    this.checkoutService.updateCart(cartUpdated).subscribe();

    this.router.navigate(['/checkout/cart']);
  }
}
