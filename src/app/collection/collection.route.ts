import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionResolve } from './../services/Resolve/collection.resolve';
import { CollectionDetailsResolve } from '../services/Resolve/collectionDetails.resolve';

import { CollectionComponent } from './collection.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

const collectionRouterConfig: Routes = [
  {
    path: '',
    component: CollectionComponent,

    children: [
      {
        path: 'list',
        component: ListComponent,
        resolve: {
          dogs: CollectionResolve,
        },
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        resolve: {
          dog: CollectionDetailsResolve,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collectionRouterConfig)],
  exports: [RouterModule],
})
export class CollectionRoutingModule {}
