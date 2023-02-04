import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CheckoutRoutingModule } from './checkout.route';

import { CheckoutComponent } from './checkout.component';
import { CartComponent } from './cart/cart.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [CheckoutComponent, CartComponent],
  imports: [
    CommonModule,
    RouterModule,
    CheckoutRoutingModule,
    SharedModule,
    MaterialModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' }),
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutModule {}
