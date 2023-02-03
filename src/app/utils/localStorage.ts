import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageUtils {
  public getUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  public saveDataFromResponse(response: any) {
    this.saveToken(response.accessToken);
    this.saveUserId(response.user.id.toString());
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public saveUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  public removeCredentials() {
    this.removeToken();
    this.removeUserId();
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public removeUserId(): void {
    localStorage.removeItem('userId');
  }
}
