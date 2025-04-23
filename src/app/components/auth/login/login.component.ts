import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ButtonComponent } from "../../../shared/button/button.component";
import { NavigateService } from '../../../services/navigate.service';


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
      .then((userCredentials) => {
        const user = userCredentials.user;
        this._sessionService.setSession(true);
        console.log('User logged in:', user.uid, user.email);
        this._navigateService.navigateTo('dashboard')
      })
      .catch(error => console.error('login failed', error));
  }
  navToSignup() { this._navigateService.navigateTo('signup') }
  backBtn() { this.location.back(); }
}
