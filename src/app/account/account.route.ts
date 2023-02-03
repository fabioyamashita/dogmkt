import { AccountGuard } from './services/account.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const accountRouterConfig: Routes = [
  {
    path: '',
    component: AccountComponent,

    children: [
      { path: 'login', component: LoginComponent, canActivate: [AccountGuard] },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AccountGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountRouterConfig)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
