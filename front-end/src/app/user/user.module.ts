import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user.route';
import { SharedModule } from '../shared/shared.module';

import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [UserProfileComponent, PurchaseHistoryComponent],
  imports: [CommonModule, RouterModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
