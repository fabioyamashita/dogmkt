import { PurchaseResolve } from './../services/purchase.resolve';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionResolve } from '../services/collection.resolve';
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
