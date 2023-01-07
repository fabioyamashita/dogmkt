import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerComponent } from './seller.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const sellerRouterConfig: Routes = [
  {
    path: '',
    component: SellerComponent,

    children: [
      { path: 'create', component: CreateComponent },
      { path: 'create', component: EditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sellerRouterConfig)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
