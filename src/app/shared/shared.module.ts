import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuantityBoxComponent } from './components/quantity-box/quantity-box.component';
import { DogItemComponent } from './components/dog-list/dog-item/dog-item.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { SearchAreaComponent } from './components/search-area/search-area.component';
import { DogListComponent } from './components/dog-list/dog-list.component';
import { DogDetailsComponent } from './components/dog-details/dog-details.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    QuantityBoxComponent,
    DogItemComponent,
    ProfileFormComponent,
    SearchAreaComponent,
    DogListComponent,
    DogDetailsComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    QuantityBoxComponent,
    ProfileFormComponent,
    SearchAreaComponent,
    DogListComponent,
    DogDetailsComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
