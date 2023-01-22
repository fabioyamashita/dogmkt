import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user.route';
import { SharedModule } from '../shared/shared.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from '../material/material.module';
import { PurchaseBoxComponent } from './purchase-box/purchase-box.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { PurchaseResolve } from '../services/purchase.resolve';

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
  providers: [PurchaseResolve],
})
export class UserModule {}
