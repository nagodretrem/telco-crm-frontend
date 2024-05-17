import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInStatus: boolean = false;

  constructor() {}

  login(username: string, password: string): boolean {
    if ((username === 'user1' && password === 'password1') || (username === 'user2' && password === 'password2')) {
      this.isLoggedInStatus = true;
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isLoggedInStatus = false;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
