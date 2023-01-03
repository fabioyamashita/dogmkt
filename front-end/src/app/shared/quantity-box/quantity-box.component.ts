import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quantity-box',
  templateUrl: './quantity-box.component.html',
  styleUrls: ['./quantity-box.component.css'],
})
export class QuantityBoxComponent {
  @Input()
  currentQuantity: number = 1;

  @Input()
  maxQuantity: number = 1;

  increaseQuantity(): void {
    if (this.currentQuantity >= this.maxQuantity) return;
    this.currentQuantity++;
  }

  decreaseQuantity(): void {
    if (this.currentQuantity == 1) return;
    this.currentQuantity--;
  }
}