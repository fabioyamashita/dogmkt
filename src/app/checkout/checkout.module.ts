import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CheckoutRoutingModule } from './checkout.route';

import { CheckoutComponent } from './checkout.component';
import { CartComponent } from './cart/cart.component';
import { CartGuard } from './services/cart.guard';

@NgModule({
  declarations: [CheckoutComponent, CartComponent],
  imports: [
    CommonModule,
    RouterModule,
    CheckoutRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [CartGuard],
})
export class CheckoutModule {}
