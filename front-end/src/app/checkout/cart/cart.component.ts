import { NavigationUtils } from './../../utils/navigationUtils';
import { concatMap, map, tap, forkJoin, switchMap, from, toArray } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Store } from 'src/app/app.store';

import { SellerHelperService } from 'src/app/services/seller.helper.service';
import { CollectionService } from 'src/app/services/collection.service';
import { CheckoutService } from '../../services/checkout.service';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

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
    private navigationUtils: NavigationUtils
  ) {}

  cart?: Cart;
  dogsCart: any[] = [];

  ngOnInit(): void {
    // VERSÃO REDIGIDA 'CRUA'
    // Primeiro eu preciso fazer a requisição GET do meu carrinho - tanto para pegar o carrinho atualizado
    //    quanto para settar um valor pro meu Cart no Store.

    // A ideia é ficar ouvindo o this.store.getCart$() (que é uma observable) e popular o component de acordo com esse Cart que vai vir da Store

    // Depois eu preciso transformar o objeto Cart (que vai vir da store) em um objeto customizado
    //    para que tenha as informações detalhadas de cada cachorro.
    // Para isso, preciso fazer N requisições GET para cada ID de cachorro encontrado.
    // A minha propriedade dogsCart é o que está populando todo o componente HTML,
    //    por isso achei mais fácil fazer um objeto completo. Mas parece que só dificultou as coisas :(
    // Obs.: Cada requisição precisa esperar a anterior finalizar para ser chamada (com exceção das getById dos cachorros)

    this.checkoutService
      .getCart(parseInt(this.localStorageUtils.getUserId()))
      .subscribe({
        next: () => {
          this.store.getCart$().subscribe({
            next: (cart) => {
              this.cart = cart;
              let customDogObject: any = [];

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
      });

    // VERSÃO MOSTRADA EM AULA
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

    //   this.checkoutService
    //     .getCart(parseInt(this.localStorageUtils.getUserId()))
    //     .pipe(
    //       tap((cart) => {
    //         this.cart = cart;
    //       }),
    //       concatMap((cart) => from(cart?.dogs)),
    //       concatMap((dog) =>
    //         this.collectionService.getById(dog.dogId).pipe(
    //           map((dogInfo) => ({
    //             dog: dogInfo,
    //             quantity: dog.quantity,
    //             dogId: dogInfo.id,
    //           }))
    //         )
    //       ),
    //       toArray()
    //     )
    //     .subscribe({
    //       next: (dogsCart) => {
    //         this.dogsCart = dogsCart;
    //       },
    //     });
    // }
  }

  deleteFromCart(event: any): void {
    const id: number = parseInt(event.target.closest('.product-info').id);

    let updatedCart = JSON.parse(JSON.stringify(this.cart!));
    let indexDogInCart = this.cart?.dogs.findIndex((dog) => dog.dogId == id)!;
    let quantityInCart = this.cart?.dogs[indexDogInCart].quantity;

    let updatedDog: Dog;

    // VERSÃO REDIGIDA 'CRUA'
    // Para deletar, primeiro pego as informações atualizadas do cachorro pelo getById na service
    // Depois preciso atualizar a quantidade disponível que vai ser salva no banco
    // Atualizo o cachorro no banco via this.collectionService.updateDog com o cachorro atualizado
    // Só depois do cachorro ter atualizado, eu vou atualizar o meu carrinho
    // Faço todas as contas para atualizar os valores
    // Atualizo o Cart via this.checkoutService.updateCart com o cart atualizado
    // Finalmente atualizo o meu cart que serve para popular meu componente
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

    // VERSÃO MOSTRADA NA AULA
    // this.collectionService
    //   .getById(id)
    //   .pipe(
    //     tap((dog) => {
    //       updatedDog = dog;
    //       updatedDog.availableQuantity += quantityInCart!;
    //     }),
    //     concatMap(() => this.collectionService.updateDog(updatedDog)),
    //     tap(() => {
    //       this.updateCartInfo(
    //         updatedCart,
    //         updatedDog,
    //         indexDogInCart,
    //         quantityInCart!
    //       );
    //     }),
    //     concatMap(() => this.checkoutService.updateCart(updatedCart!)),
    //     tap(() => {
    //       this.updateCartInfo(
    //         this.cart!,
    //         updatedDog,
    //         indexDogInCart,
    //         quantityInCart!
    //       );
    //     })
    //   )
    //   .subscribe({
    //     next: () => window.location.reload(),
    //   });
  }

  submitOrder(): void {
    let purchase = new Purchase(
      this.cart?.userId,
      this.cart?.summary,
      this.cart?.discount,
      this.cart?.total,
      this.cart?.dogs
    );

    this.checkoutService.createPurchase(purchase).subscribe({
      next: () => {
        this.checkoutService
          .updateCart({
            id: this.cart?.id,
            userId: this.cart?.userId,
            summary: 0,
            discount: 0,
            total: 0,
            dogs: [],
          })
          .subscribe();
      },
      complete: () => this.navigationUtils.navigateToUserProfile(),
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
