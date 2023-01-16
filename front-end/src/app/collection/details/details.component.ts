import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SellerHelperService } from './../../services/seller.helper.service';

import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
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
}