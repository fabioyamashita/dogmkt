import { CollectionResolve } from './services/collection.resolve';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionComponent } from './collection.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

const collectionRouterConfig: Routes = [
  {
    path: '',
    component: CollectionComponent,

    children: [
      { path: 'list', component: ListComponent },
      {
        path: 'details/:id',
        component: DetailsComponent,
        resolve: {
          dog: CollectionResolve,
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
