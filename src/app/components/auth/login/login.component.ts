import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ButtonComponent } from "../../../shared/button/button.component";
import { NavigateService } from '../../../services/navigate.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-login',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private fireAuth = inject(Auth);
  private router = inject(Router);
  private _sessionService = inject(SessionService);
  private _navigateService = inject(NavigateService);
  private location = inject(Location);
  private route = inject(ActivatedRoute);

  login() {
    signInWithEmailAndPassword(this.fireAuth, this.email, this.password)
      .then(userCredentials => {
        const user = userCredentials.user;
  
        fetch(`${environment.host}${environment.apiUsers}/firebase/${user.uid}`)
          .then(res => res.json())
          .then(mongoUser => {
            console.log('Mongo user found:', mongoUser);

            this._sessionService.setLoginSession(user);
            this._navigateService.navigateTo(`${mongoUser._id}/dashboard`);
          })
          console.log('User logged in:', user.uid, user.email);
      })
      .catch(error => console.error('login failed', error));
  }

  navToSignup() { this._navigateService.navigateTo('signup') }
  backBtn() { this.location.back(); }
}
