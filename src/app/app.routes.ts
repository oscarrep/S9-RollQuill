import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CharacterComponent } from './components/pages/character/character.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: ':uid/dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: ':uid/character/:id', component: CharacterComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'home' }
];
