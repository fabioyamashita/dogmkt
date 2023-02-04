import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerCollectionResolve } from './../services/Resolve/sellerCollection.resolve';
import { CollectionDetailsResolve } from '../services/Resolve/collectionDetails.resolve';
import { FormGuard } from './services/form.guard';

import { SellerComponent } from './seller.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
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
          dog: CollectionDetailsResolve,
        },
        canDeactivate: [FormGuard],
      },
      {
        path: 'preview/:id',
        component: DogPreviewComponent,
        resolve: {
          dog: CollectionDetailsResolve,
        },
      },
      {
        path: 'profile',
        component: SellerProfileComponent,
        resolve: {
          dogs: SellerCollectionResolve,
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
