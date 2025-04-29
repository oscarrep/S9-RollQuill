import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CharacterComponent } from './components/pages/character/character.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { authGuard } from './guards/auth-guard.guard';
import { AddEditComponent } from './components/pages/add-edit/add-edit.component';
import { CharacterFormComponent } from './components/pages/add-edit/forms/character-form/character-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: ':uid/dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: ':uid/character/:id', component: CharacterComponent, canActivate: [authGuard] },
  {
    path: ':uid/create',
    component: AddEditComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'character',
        component: CharacterFormComponent,
      },
    ]
  },
  { path: '**', redirectTo: 'home' }
];
