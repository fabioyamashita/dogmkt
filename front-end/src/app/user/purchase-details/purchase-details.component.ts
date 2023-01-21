import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Cart from 'src/app/models/cart';
import { CollectionService } from 'src/app/services/collection.service';
import { SellerHelperService } from 'src/app/services/seller.helper.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css'],
})
export class PurchaseDetailsComponent implements OnInit {
  constructor(
    private collectionService: CollectionService,
    public sellerHelperService: SellerHelperService,
    private activatedRoute: ActivatedRoute
  ) {}

  cart?: Cart;
  dogsCart: any[] = [];
  purchaseDetails: any;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: ({ purchase }) => {
        let customPurchaseDetails: any = JSON.parse(JSON.stringify(purchase));

        purchase.dogs.map((dog: any, index: any) => {
          this.collectionService.getById(dog.dogId).subscribe({
            next: (dogFoundById) => {
              customPurchaseDetails.dogs[index].dog = dogFoundById;
            },
          });
        });

        this.purchaseDetails = customPurchaseDetails;
      },
    });
  }
}
