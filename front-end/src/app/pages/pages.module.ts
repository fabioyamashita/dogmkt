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
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { CartComponent } from './cart/cart.component';
import { CreateDogComponent } from './create-dog/create-dog.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    DogsCollectionComponent,
    DogBreedComponent,
    DogDetailsComponent,
    CartComponent,
    CreateDogComponent,
  ],
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
