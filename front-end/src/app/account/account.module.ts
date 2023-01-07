import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountRoutingModule } from './account.route';

@NgModule({
  declarations: [AccountComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, RouterModule, AccountRoutingModule],
})
export class AccountModule {}
