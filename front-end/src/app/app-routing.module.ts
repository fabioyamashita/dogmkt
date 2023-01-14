import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'account/login', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'collection',
    loadChildren: () =>
      import('./collection/collection.module').then((m) => m.CollectionModule),
  },
  {
    path: 'sellers',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
