import { SellerHelperService } from './../../services/seller.helper.service';
import { CollectionService } from '../../services/collection.service';
import { DogHelperService } from '../../services/dog.helper.service';
import { CheckoutService } from '../../services/checkout.services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import DogCart from 'src/app/models/dogCart';
import Dog from 'src/app/models/dog';

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
    private dogHelperService: DogHelperService,
    private collectionService: CollectionService,
    private sellerHelperService: SellerHelperService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dog }) => (this.dog = dog));
    this.sellerName = this.sellerHelperService.getSellerName(
      this.dog.sellerId ?? ''
    );
  }

  dog!: Dog;
  sellerName: string = '';
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

    const dogUpdated = this.dogHelperService.updateDogInCollection(dogCart);
    const cartUpdated = this.dogHelperService.updateCartStore(dogCart);

    this.collectionService.updateDog(dogUpdated).subscribe({
      complete: () => this.checkoutService.updateCart(cartUpdated).subscribe(),
    });

    this.router.navigate(['/checkout/cart']);
  }
}
