import { concatMap, map, tap, forkJoin, switchMap, from, toArray } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store } from 'src/app/app.store';

import { SellerHelperService } from 'src/app/services/seller.helper.service';
import { CollectionService } from 'src/app/services/collection.service';
import { CheckoutService } from '../../services/checkout.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

import Cart from '../../models/cart';
import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private store: Store,
    private checkoutService: CheckoutService,
    private collectionService: CollectionService,
    public sellerHelperService: SellerHelperService,
    private localStorageUtils: LocalStorageUtils
  ) {}

  cart?: Cart;
  dogsCart: any[] = [];
  newDogCart: any[] = [];

  ngOnInit(): void {
    // this.checkoutService
    //   .getCart(parseInt(this.localStorageUtils.getUserId()))
    //   .subscribe(() =>
    //     this.store
    //       .getCart$()
    //       .pipe(
    //         tap((cart) => {
    //           this.cart = cart;
    //         }),
    //         switchMap((cart: Cart) =>
    //           forkJoin(
    //             cart.dogs.map((dog: any, index: any) =>
    //               this.collectionService.getById(dog.dogId).pipe(
    //                 map((dogInfo) => ({
    //                   dog: dogInfo,
    //                   quantity: dog.quantity,
    //                   dogId: dogInfo.id,
    //                 }))
    //               )
    //             )
    //           )
    //         )
    //       )
    //       .subscribe({
    //         next: (dogsCart) => {
    //           this.dogsCart = dogsCart;
    //         },
    //       })
    //   );

    this.checkoutService
      .getCart(parseInt(this.localStorageUtils.getUserId()))
      .pipe(
        tap((cart) => {
          this.cart = cart;
          console.log(this.cart);
        }),
        concatMap((cart) => from(cart?.dogs)),
        concatMap((dog) =>
          this.collectionService.getById(dog.dogId).pipe(
            map((dogInfo) => ({
              dog: dogInfo,
              quantity: dog.quantity,
              dogId: dogInfo.id,
            }))
          )
        ),
        toArray()
      )
      .subscribe({
        next: (dogsCart) => {
          this.dogsCart = dogsCart;
        },
      });
  }

  deleteFromCart(event: any): void {
    const id: number = parseInt(event.target.closest('.product-info').id);

    let updatedCart = this.cart!;
    let indexDogInCart = this.cart?.dogs.findIndex((dog) => dog.dogId == id)!;
    let quantityInCart = this.cart?.dogs[indexDogInCart].quantity;

    let updatedDog: Dog;

    this.collectionService
      .getById(id)
      .pipe(
        tap((dog) => {
          updatedDog = dog;
          updatedDog.availableQuantity += quantityInCart!;
        }),
        concatMap(() => this.collectionService.updateDog(updatedDog)),
        tap(() => {
          let sumToSubtract = updatedDog.price! * quantityInCart!;

          updatedCart.summary -= sumToSubtract;
          updatedCart.total = updatedCart.summary - updatedCart.discount;

          updatedCart?.dogs.splice(indexDogInCart, 1);
        }),
        concatMap(() => this.checkoutService.updateCart(updatedCart!)),
        tap(() => {
          let sumToSubtract = updatedDog.price! * quantityInCart!;

          this.cart!.summary -= sumToSubtract;
          this.cart!.total = updatedCart.summary - updatedCart.discount;

          this.cart!.dogs.splice(indexDogInCart, 1);
        })
      )
      .subscribe({ next: () => window.location.reload() });
    // .subscribe();
  }
}
