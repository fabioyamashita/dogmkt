import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SellerRoutingModule } from './seller.route';
import { MaterialModule } from '../material/material.module';
import { CollectionResolve } from '../services/collection.resolve';

import { SellerComponent } from './seller.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { DogFormComponent } from './dog-form/dog-form.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { DogPreviewComponent } from './dog-preview/dog-preview.component';

@NgModule({
  declarations: [
    SellerComponent,
    EditComponent,
    CreateComponent,
    DogFormComponent,
    SellerProfileComponent,
    DogPreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SellerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [CollectionResolve, DatePipe],
})
export class SellerModule {}