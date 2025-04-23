import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ButtonComponent } from "../../../shared/button/button.component";
import { NavigateService } from '../../../services/navigate.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private _authService = inject(AuthService);
  private _navigateService = inject(NavigateService);
  private location = inject(Location);

  login() {
    this._authService.login(this.email, this.password)
      .then(user => this._navigateService.navigateTo(`${user._id}/dashboard`))
      .catch(err => console.error('Login failed', err));
  }

  navToSignup() { this._navigateService.navigateTo('signup') }
  backBtn() { this.location.back(); }
}
