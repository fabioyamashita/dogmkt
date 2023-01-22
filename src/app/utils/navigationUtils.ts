import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationUtils {
  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/account/login']);
  }

  navigateToCollection(): void {
    this.router.navigate(['/collection/list']);
  }

  navigateToSellerProfile(): void {
    this.router.navigate(['/seller/profile']);
  }

  navigateToCart(): void {
    this.router.navigate(['/checkout/cart']);
  }

  navigateToUserProfile(): void {
    this.router.navigate(['/user/profile']);
  }
}
