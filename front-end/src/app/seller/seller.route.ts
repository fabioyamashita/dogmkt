import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerComponent } from './seller.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CollectionResolve } from '../services/collection.resolve';

const sellerRouterConfig: Routes = [
  {
    path: '',
    component: SellerComponent,

    children: [
      { path: 'create', component: CreateComponent },
      {
        path: 'edit/:id',
        component: EditComponent,
        resolve: {
          dog: CollectionResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sellerRouterConfig)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
