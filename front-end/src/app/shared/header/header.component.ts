import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from 'src/app/app.store';
import Cart from 'src/app/models/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public router: Router, private store: Store) {}

  cart: Cart | undefined;
  countDogsInCart: number | undefined;

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
  }
}
