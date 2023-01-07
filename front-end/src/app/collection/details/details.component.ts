import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  showDogInfo: boolean = true;
  showDogDetails: boolean = false;

  initialQuantity: number = 1;
  maxQuantity: number = 5;

  onMoreInfoChange(event: any): void {
    if (event.target.value == 'dog-info') {
      this.showDogInfo = true;
      this.showDogDetails = false;
    } else if (event.target.value == 'dog-details') {
      this.showDogInfo = false;
      this.showDogDetails = true;
    }
  }

  increaseQuantity(): void {
    if (this.initialQuantity >= this.maxQuantity) return;
    this.initialQuantity++;
  }

  decreaseQuantity(): void {
    if (this.initialQuantity == 1) return;
    this.initialQuantity--;
  }
}
