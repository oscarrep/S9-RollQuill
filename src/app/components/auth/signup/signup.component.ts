import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../shared/button/button.component";
import { SessionService } from '../../../services/session.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-signup',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  private fireAuth = inject(Auth);
  private router = inject(Router);
  private location = inject(Location)
  private _sessionService = inject(SessionService);
  appUrl = environment.host;
  appUsers = environment.apiUsers;

  signUp() {
    createUserWithEmailAndPassword(this.fireAuth, this.email, this.password)
      .then(userCredentials => {
        const user = userCredentials.user;
  
        fetch(`${this.appUrl}${this.appUsers}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fireUid: user.uid, email: user.email })
        })
          .then(res => res.json())
          .then(data => {
            console.log('Mongo user created:', data);
  
            this._sessionService.setLoginSession(user);
  
            this.router.navigate([`${data._id}/dashboard`]);
          })
          .catch(err => console.error('DB save failed', err));
      })
      .catch(error => console.error('Error creating user:', error));
  }

  backBtn() { this.location.back(); }
}
