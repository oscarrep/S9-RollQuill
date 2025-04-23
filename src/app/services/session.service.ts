import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isAuth: boolean = false;

  getSession(): boolean { return this.isAuth; }
  setSession(value: boolean) { this.isAuth = value };
}
