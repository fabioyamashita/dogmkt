import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Purchase from 'src/app/models/purchase';

@Component({
  selector: 'app-purchase-box',
  templateUrl: './purchase-box.component.html',
  styleUrls: ['./purchase-box.component.css'],
})
export class PurchaseBoxComponent {
  constructor(private router: Router) {}

  @Input() purchase!: Purchase;

  navigateToDetails(id: number): void {
    this.router.navigate(['/user/purchases/' + id.toString()]);
  }
}
