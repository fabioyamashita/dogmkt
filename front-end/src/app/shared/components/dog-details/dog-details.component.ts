import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CheckoutService } from 'src/app/services/checkout.service';
import { CollectionService } from 'src/app/services/collection.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

import Dog from 'src/app/models/dog';
import Cart from 'src/app/models/cart';
import DogCart from 'src/app/models/dogCart';
import { concatMap, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.css'],
})
export class DogDetailsComponent {
  constructor(
    public router: Router,
    private checkoutService: CheckoutService,
    private collectionService: CollectionService,
    private localStorageUtils: LocalStorageUtils
  ) {}

  @Input() dog!: Dog;
  @Input() sellerName: string = '';

  currentQuantity: number = 1;

  showDogInfo: boolean = true;
  showDogDetails: boolean = false;
  updatedDog!: Dog;
  updatedCart!: Cart;

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
    const dogCartAdd: DogCart = {
      dogId: this.dog.id!,
      quantity: this.currentQuantity,
    };

    this.collectionService
      .getById(this.dog.id!)
      .pipe(
        concatMap((dog) => {
          this.updatedDog = dog;
          this.updatedDog.availableQuantity -= this.currentQuantity;
          return this.collectionService.updateDog(this.updatedDog);
        }),
        concatMap(() =>
          this.checkoutService.getCart(
            parseInt(this.localStorageUtils.getUserId())
          )
        ),
        tap((cart) => {
          this.updatedCart = cart;
          let index = this.updatedCart.dogs.findIndex(
            (dogCart) => dogCart.dogId == this.updatedDog.id
          );

          if (index == -1) {
            this.updatedCart.dogs.push(dogCartAdd);
          } else {
            this.updatedCart.dogs[index].quantity += this.currentQuantity;
          }

          let sumToAdd = this.updatedDog.price! * this.currentQuantity;

          this.updatedCart.summary += sumToAdd;
          this.updatedCart.total =
            this.updatedCart.summary - this.updatedCart.discount;
        }),
        concatMap(() => this.checkoutService.updateCart(this.updatedCart))
      )
      .subscribe(() => this.router.navigate(['/checkout/cart']));
  }
}
