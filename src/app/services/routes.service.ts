import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  constructor(private router: Router) {}

  private routeLogin: string = '/account/login';
  private routeCollection: string = '/collection/list';
  private routeSellerProfile: string = '/seller/profile';
  private routeCart: string = '/checkout/cart';
  private routeUserProfile: string = '/user/profile';

  // GETTERS
  getRouteLogin(): string {
    return this.routeLogin;
  }

  getRouteCollection(): string {
    return this.routeCollection;
  }

  getRouteSellerProfile(): string {
    return this.routeSellerProfile;
  }

  getRouteCart(): string {
    return this.routeCart;
  }

  getRouteUserProfile(): string {
    return this.routeUserProfile;
  }

  // NAVIGATION
  navigateToLogin(): void {
    this.router.navigate([this.routeLogin]);
  }

  navigateToCollection(): void {
    this.router.navigate([this.routeCollection]);
  }

  navigateToSellerProfile(): void {
    this.router.navigate([this.routeSellerProfile]);
  }

  navigateToCart(): void {
    this.router.navigate([this.routeCart]);
  }

  navigateToUserProfile(): void {
    this.router.navigate([this.routeUserProfile]);
  }
}
