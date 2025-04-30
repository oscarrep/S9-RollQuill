import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../shared/button/button.component";
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { InputComponent } from '../../../shared/input/input.component';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, ButtonComponent,InputComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private router = inject(Router);
  private location = inject(Location)
  private _authService = inject(AuthService);
  private fb = inject(FormBuilder);
  appUrl = environment.host;
  appUsers = environment.apiUsers;
  signupForm!: FormGroup;


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signUp() {
    const { email, password } = this.signupForm.value;
    this._authService.signup(email, password)
      .then(user => this.router.navigate([`${user._id}/dashboard`]))
      .catch(err => console.error('Signup failed', err));
  }
  

  backBtn() { this.location.back(); }
}
