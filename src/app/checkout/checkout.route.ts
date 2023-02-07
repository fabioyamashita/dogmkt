import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckoutComponent } from './checkout.component';
import { CartComponent } from './cart/cart.component';
import { CartGuard } from './services/cart.guard';

const checkoutRouterConfig: Routes = [
  {
    path: '',
    component: CheckoutComponent,

    children: [
      {
        path: 'cart',
        component: CartComponent,
        canDeactivate: [CartGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(checkoutRouterConfig)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
