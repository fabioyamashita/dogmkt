import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurchasesListResolve } from './../services/Resolve/purchasesList.resolve';
import { PurchaseResolve } from '../services/Resolve/purchase.resolve';

import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';

const userRouterConfig: Routes = [
  {
    path: '',
    component: UserComponent,

    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
        resolve: {
          purchases: PurchasesListResolve,
        },
      },
      {
        path: 'purchases/:id',
        component: PurchaseDetailsComponent,
        resolve: {
          purchase: PurchaseResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRouterConfig)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
