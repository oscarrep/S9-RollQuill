import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private user: any = null;

  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user')!);
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  }

  setSession(active: boolean) {
    localStorage.setItem('session', JSON.stringify(active));
  }

  getSession() {
    return JSON.parse(localStorage.getItem('session')!);
  }

  clearSession() {
    localStorage.removeItem('session');
  }

  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }
  
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  setLoginSession(user: any) {
    this.setSession(true);
    this.setUserId(user._id);
    this.setUser(user);
  }
}
