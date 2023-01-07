import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuantityBoxComponent } from './quantity-box/quantity-box.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, QuantityBoxComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, QuantityBoxComponent],
})
export class SharedModule {}
