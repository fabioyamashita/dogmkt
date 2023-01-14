import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionResolve } from '../services/collection.resolve';
import { UserProfileComponent } from './user-profile/user-profile.component';

const userRouterConfig: Routes = [
  {
    path: '',
    component: UserComponent,

    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
        // resolve: {
        //   dog: CollectionResolve,
        // },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRouterConfig)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
