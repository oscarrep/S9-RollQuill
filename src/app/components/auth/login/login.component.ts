import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ButtonComponent } from "../../../shared/button/button.component";
import { NavigateService } from '../../../services/navigate.service';
import { AuthService } from '../../../services/auth.service';
import { InputComponent } from '../../../shared/input/input.component';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _navigateService = inject(NavigateService);
  private location = inject(Location);
  private fb = inject(FormBuilder);
  loginForm!: FormGroup;
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  login() {
    const { email, password } = this.loginForm.value;
    this._authService.login(email, password)
      .then(user => this._navigateService.navigateTo(`${user._id}/dashboard`))
      .catch(err => console.error('Login failed', err));
  }

  navToSignup() { this._navigateService.navigateTo('signup') }
  backBtn() { this.location.back(); }
}
