import { NavigationUtils } from './../../../utils/navigationUtils';
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
    private localStorageUtils: LocalStorageUtils,
    private navigationUtils: NavigationUtils
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

  addItemToCart(): void {
    const dogCartAdd: DogCart = {
      dogId: this.dog.id!,
      quantity: this.currentQuantity,
    };

    this.collectionService.getById(this.dog.id!).subscribe({
      next: (dog) => {
        this.updatedDog = dog;
        this.updatedDog.availableQuantity -= this.currentQuantity;

        this.collectionService.updateDog(this.updatedDog).subscribe({
          next: () => {
            this.checkoutService
              .getCart(parseInt(this.localStorageUtils.getUserId()))
              .subscribe({
                next: (cart) => {
                  this.updatedCart = JSON.parse(JSON.stringify(cart));

                  let index = cart.dogs.findIndex(
                    (dogCart) => dogCart.dogId == this.updatedDog.id
                  );

                  if (index == -1) {
                    this.updatedCart.dogs.push(dogCartAdd);
                  } else {
                    this.updatedCart.dogs[index].quantity +=
                      this.currentQuantity;
                  }

                  let sumToAdd = this.updatedDog.price! * this.currentQuantity;

                  this.updatedCart.summary += sumToAdd;
                  this.updatedCart.total =
                    this.updatedCart.summary - this.updatedCart.discount;

                  this.updatedCart.total = +this.updatedCart.total.toFixed(2);
                  this.updatedCart.summary =
                    +this.updatedCart.summary.toFixed(2);

                  this.checkoutService.updateCart(this.updatedCart).subscribe({
                    next: () => this.navigationUtils.navigateToCart(),
                  });
                },
              });
          },
        });
      },
    });
  }
}
