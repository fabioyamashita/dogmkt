import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { QuantityBoxComponent } from './quantity-box/quantity-box.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, QuantityBoxComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent, QuantityBoxComponent],
})
export class SharedModule {}
