import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { CollectionRoutingModule } from './collection.route';
import { CollectionService } from '../services/collection.service';
import { CollectionResolve } from '../services/collection.resolve';

import { CollectionComponent } from './collection.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [CollectionComponent, ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    CollectionRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [CollectionService, CollectionResolve],
})
export class CollectionModule {}
