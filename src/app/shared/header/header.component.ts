import { RoutesService } from '../../services/routes.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from 'src/app/app.store';
import Cart from 'src/app/models/cart';
import User from 'src/app/models/user';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public router: Router,
    private store: Store,
    private localStorageUtils: LocalStorageUtils,
    private routesService: RoutesService
  ) {}

  cart: Cart | undefined;
  countDogsInCart: number | undefined;
  user: User | undefined;

  ngOnInit(): void {
    this.store.getCart$().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.countDogsInCart = cart.dogs.reduce(
          (acc: any, curr: any) => acc + curr.quantity,
          0
        );
      },
    });

    this.store.getUser$().subscribe({
      next: (users) =>
        (this.user = users.find(
          (user) => user.id == parseInt(this.localStorageUtils.getUserId())
        )),
    });
  }

  logout(): void {
    this.localStorageUtils.removeCredentials();
    this.routesService.navigateToLogin();
  }
}
