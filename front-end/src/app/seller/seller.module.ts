import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { SellerRoutingModule } from './seller.route';

import { SellerComponent } from './seller.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [SellerComponent, EditComponent, CreateComponent],
  imports: [CommonModule, RouterModule, SellerRoutingModule, SharedModule],
})
export class SellerModule {}
