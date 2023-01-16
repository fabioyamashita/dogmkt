import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SellerHelperService } from 'src/app/services/seller.helper.service';
import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-dog-preview',
  templateUrl: './dog-preview.component.html',
  styleUrls: ['./dog-preview.component.css'],
})
export class DogPreviewComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private sellerHelperService: SellerHelperService
  ) {}

  dog!: Dog;
  sellerName: string = '';

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dog }) => (this.dog = dog));

    this.sellerName = this.sellerHelperService.getSellerName(
      this.dog.sellerId ?? ''
    );
  }
}
