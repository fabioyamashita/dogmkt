import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Store } from 'src/app/app.store';
import { SellerHelperService } from 'src/app/services/seller.helper.service';
import { CollectionService } from 'src/app/services/collection.service';
import { CheckoutService } from '../../services/checkout.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { NavigationUtils } from './../../utils/navigationUtils';

import Cart from '../../models/cart';
import Dog from 'src/app/models/dog';
import Purchase from 'src/app/models/purchase';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private checkoutService: CheckoutService,
    private store: Store,
    private collectionService: CollectionService,
    public sellerHelperService: SellerHelperService,
    private localStorageUtils: LocalStorageUtils,
    private navigationUtils: NavigationUtils,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  cart?: Cart;
  dogsCart: any[] = [];

  ngOnInit(): void {
    this.spinner.show();

    this.checkoutService
      .getCart(parseInt(this.localStorageUtils.getUserId()))
      .subscribe({
        next: () => {
          this.store.getCart$().subscribe({
            next: (cart) => {
              this.cart = cart;
              let customDogObject: any = [];
              console.log('passou aqui');
              console.log(cart.dogs);

              cart.dogs.map((dog) => {
                this.collectionService.getById(dog.dogId).subscribe({
                  next: (dogFoundById) => {
                    customDogObject.push({
                      dog: dogFoundById,
                      quantity: dog.quantity,
                      dogId: dogFoundById.id,
                    });
                  },
                });
              });

              this.dogsCart = customDogObject;
            },
          });
        },
        complete: () => this.spinner.hide(),
      });
  }

  deleteFromCart(event: any): void {
    this.spinner.show();

    const id: number = parseInt(event.target.closest('.product-info').id);

    let updatedCart = JSON.parse(JSON.stringify(this.cart!));
    let indexDogInCart = this.cart?.dogs.findIndex((dog) => dog.dogId == id)!;
    let quantityInCart = this.cart?.dogs[indexDogInCart].quantity;

    let updatedDog: Dog;

    this.collectionService.getById(id).subscribe({
      next: (dog) => {
        updatedDog = dog;
        updatedDog.availableQuantity += quantityInCart!;

        this.collectionService.updateDog(updatedDog).subscribe({
          next: () => {
            let sumToSubtract = updatedDog.price! * quantityInCart!;

            updatedCart.summary -= sumToSubtract;
            updatedCart.total = updatedCart.summary - updatedCart.discount;

            updatedCart.summary = +updatedCart.summary.toFixed(2);
            updatedCart.total = +updatedCart.total.toFixed(2);

            updatedCart?.dogs.splice(indexDogInCart, 1);

            this.checkoutService.updateCart(updatedCart!).subscribe({
              next: () => {
                this.cart = updatedCart;
              },
            });
          },
        });
      },
    });
    this.spinner.hide();
  }

  submitOrder(): void {
    let purchase: Purchase = new Purchase(
      this.cart?.userId,
      this.cart?.summary,
      this.cart?.discount,
      this.cart?.total,
      this.cart?.dogs
    );

    this.checkoutService.createPurchase(purchase).subscribe({
      next: (purchase: Purchase) => {
        this.checkoutService
          .updateCart({
            id: this.cart?.id,
            userId: this.cart?.userId,
            summary: 0,
            discount: 0,
            total: 0,
            dogs: [],
          })
          .subscribe(() => {
            let toast = this.toastr.success(
              `Order ID #${purchase.id} created!`,
              'Thank you!!!',
              { timeOut: 3000 }
            );

            if (toast) {
              toast.onShown.subscribe(() =>
                this.navigationUtils.navigateToUserProfile()
              );
            }
          });
      },
    });
  }

  updateCartInfo(
    cart: Cart,
    updatedDog: Dog,
    index: number,
    quantityInCart: number
  ): void {
    let sumToSubtract = updatedDog.price! * quantityInCart!;

    cart.summary -= sumToSubtract;
    cart.total = cart.summary - cart.discount;

    cart.summary = +this.cart!.summary.toFixed(2);
    cart.total = +this.cart!.total.toFixed(2);

    cart?.dogs.splice(index, 1);
  }
}
