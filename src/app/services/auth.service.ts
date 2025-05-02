import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { SessionService } from './session.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private _sessionService = inject(SessionService);
  private host = environment.host;
  private apiUsers = environment.apiUsers;

  async signup(email: string, password: string) {
    const userCredentials = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredentials.user;

    const mongoUser = await this.createMongoUser(user.uid, email, password);
    this._sessionService.setLoginSession(mongoUser);
    return mongoUser;
  }

  async login(email: string, password: string) {
    const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
    const user = userCredentials.user;

    const mongoUser = await this.getMongoUser(user.uid);
    this._sessionService.setLoginSession(mongoUser);
    return mongoUser;
  }

  private async createMongoUser(fireUid: string, email: string, password:string) {
    const response = await fetch(`${this.host}${this.apiUsers}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fireUid, email, password })
    });
    return await response.json();
  }

  private async getMongoUser(fireUid: string) {
    const response = await fetch(`${this.host}${this.apiUsers}/firebase/${fireUid}`);
    return await response.json();
  }
}
