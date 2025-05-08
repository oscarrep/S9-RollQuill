import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ButtonComponent } from "../../../shared/button/button.component";
import { NavigateService } from '../../../services/navigate.service';
import { AuthService } from '../../../services/auth.service';
import { InputComponent } from '../../../shared/input/input.component';
import { FormValidationService } from '../../../services/form-validation.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _navigateService = inject(NavigateService);
  _formValidation = inject(FormValidationService);
  private location = inject(Location);
  private fb = inject(FormBuilder);
  loginForm!: FormGroup;
  submitted: boolean=false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this._authService.login(email, password)
      .then(user => this._navigateService.navigateTo(`${user._id}/dashboard`))
      .catch(err => console.error('Login failed', err));
  }

  navToSignup() { this._navigateService.navigateTo('signup') }
  backBtn() { this.location.back(); }
}
