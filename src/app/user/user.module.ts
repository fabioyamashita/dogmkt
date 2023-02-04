import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user.route';
import { SharedModule } from '../shared/shared.module';
import { PurchaseResolve } from '../services/Resolve/purchase.resolve';
import { PurchasesListResolve } from '../services/Resolve/purchasesList.resolve';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from '../material/material.module';
import { PurchaseBoxComponent } from './purchase-box/purchase-box.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    PurchaseBoxComponent,
    PurchaseDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [PurchaseResolve, PurchasesListResolve],
})
export class UserModule {}
