import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../shared/button/button.component";
import { SessionService } from '../../../services/session.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-signup',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  private router = inject(Router);
  private location = inject(Location)
  private _authService = inject(AuthService);
  appUrl = environment.host;
  appUsers = environment.apiUsers;

  signUp() {
    this._authService.signup(this.email, this.password)
      .then(user => this.router.navigate([`${user._id}/dashboard`]))
      .catch(err => console.error('Signup failed', err));
  }
  

  backBtn() { this.location.back(); }
}
