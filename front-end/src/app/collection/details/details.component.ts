import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SellerHelperService } from './../../services/seller.helper.service';

import Dog from 'src/app/models/dog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private sellerHelperService: SellerHelperService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dog }) => (this.dog = dog));

    this.userService.getById(this.dog.sellerId!).subscribe({
      next: (user) => (this.sellerName = user.name ?? ''),
    });
  }

  dog!: Dog;
  sellerName: string = '';
}
