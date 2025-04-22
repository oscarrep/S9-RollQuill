import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../button/button.component";
import { SessionService } from '../../../services/session.service';


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

  signUp() {
    createUserWithEmailAndPassword(this.fireAuth, this.email, this.password)
      .then(userCredentials => {
        console.log('User created:', userCredentials.user.uid, userCredentials.user.email, this.password)
        this._sessionService.setSession(true);
      })
      .catch(error => console.error('Error creating user:', error));
  }

  backBtn() { this.location.back(); }
}
