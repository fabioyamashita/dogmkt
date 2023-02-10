import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize, forkJoin } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Store } from 'src/app/app.store';
import { SellerHelperService } from 'src/app/services/seller.helper.service';
import { CollectionService } from 'src/app/services/collection.service';
import { CheckoutService } from '../../services/checkout.service';
import { RoutesService } from '../../services/routes.service';

import Cart from '../../models/cart';
import Dog from 'src/app/models/dog';
import Purchase from 'src/app/models/purchase';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private checkoutService: CheckoutService,
    private store: Store,
    private collectionService: CollectionService,
    public sellerHelperService: SellerHelperService,
    private routesService: RoutesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  cart?: Cart;
  dogsCart: any[] = [];
  subscription: Subscription | undefined;
  pageIsLoaded: boolean = false;

  ngOnInit(): void {
    this.subscription = this.store.getCart$().subscribe({
      next: (cart) => {
        this.cart = cart;
        let customDogObject: any = [];
        const requests: any = [];

        cart.dogs.map((dog) => {
          requests.push(this.collectionService.getById(dog.dogId));
        });

        forkJoin(requests)
          .pipe(
            finalize(() => {
              this.pageIsLoaded = true;
            })
          )
          .subscribe({
            next: (dogsFoundById: any) => {
              dogsFoundById.map((dogFoundById: any) => {
                const dog = cart.dogs.find((d) => d.dogId === dogFoundById.id);
                customDogObject.push({
                  dog: dogFoundById,
                  quantity: dog?.quantity,
                  dogId: dogFoundById.id,
                });
              });

              this.dogsCart = customDogObject;
            },
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  deleteFromCart(event: any): void {
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
                this.routesService.navigateToUserProfile()
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
