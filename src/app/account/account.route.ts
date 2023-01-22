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
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountRouterConfig)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
