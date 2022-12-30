import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from '../app-routing.module';
import { DogsCollectionComponent } from './dogs-collection/dogs-collection.component';
import { DogBreedComponent } from './dogs-collection/dog-breed/dog-breed.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, DogsCollectionComponent, DogBreedComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [LoginComponent],
})
export class PagesModule {}
