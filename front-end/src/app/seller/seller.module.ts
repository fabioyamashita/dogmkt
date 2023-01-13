import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SellerRoutingModule } from './seller.route';

import { SellerComponent } from './seller.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { FormComponent } from './form/form.component';
import { CollectionResolve } from '../collection/services/collection.resolve';

@NgModule({
  declarations: [
    SellerComponent,
    EditComponent,
    CreateComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SellerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [CollectionResolve],
})
export class SellerModule {}
