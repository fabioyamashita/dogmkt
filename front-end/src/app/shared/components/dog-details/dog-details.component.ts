import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CheckoutService } from 'src/app/services/checkout.service';
import { CollectionService } from 'src/app/services/collection.service';
import { DogHelperService } from 'src/app/services/dog.helper.service';

import Dog from 'src/app/models/dog';
import DogCart from 'src/app/models/dogCart';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css'],
})
export class DogDetailsComponent {
  constructor(
    public router: Router,
    private checkoutService: CheckoutService,
    private dogHelperService: DogHelperService,
    private collectionService: CollectionService
  ) {}

  @Input() dog!: Dog;
  @Input() sellerName: string = '';

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
      dogId: this.dog.id!,
      quantity: this.currentQuantity,
    };

    const dogUpdated = this.dogHelperService.updateDogInCollection(dogCart);
    const cartUpdated = this.dogHelperService.updateCartStore(dogCart);

    this.collectionService.updateDog(dogUpdated).subscribe({
      complete: () => this.checkoutService.updateCart(cartUpdated).subscribe(),
    });

    this.router.navigate(['/checkout/cart']);
  }
}
