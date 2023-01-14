import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { Store } from './app.store';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [Store, { provide: LOCALE_ID, useValue: 'en-US' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
