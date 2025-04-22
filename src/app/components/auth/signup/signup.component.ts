import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../button/button.component";


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

  signUp() {
    createUserWithEmailAndPassword(this.fireAuth, this.email, this.password)
      .then(userCredential => console.log('User created:', userCredential.user.email, this.password))
      .catch(error => console.error('Error creating user:', error));
  }

  backBtn() { this.location.back(); }
}
