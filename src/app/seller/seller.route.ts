import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormGuard } from './services/form.guard';

import { SellerComponent } from './seller.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CollectionResolve } from '../services/collection.resolve';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { DogPreviewComponent } from './dog-preview/dog-preview.component';

const sellerRouterConfig: Routes = [
  {
    path: '',
    component: SellerComponent,

    children: [
      {
        path: 'create',
        component: CreateComponent,
        canDeactivate: [FormGuard],
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        resolve: {
          dog: CollectionResolve,
        },
        canDeactivate: [FormGuard],
      },
      {
        path: 'preview/:id',
        component: DogPreviewComponent,
        resolve: {
          dog: CollectionResolve,
        },
      },
      {
        path: 'profile',
        component: SellerProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sellerRouterConfig)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
