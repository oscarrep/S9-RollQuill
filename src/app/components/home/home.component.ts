import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { NavigateService } from '../../services/navigate.service';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  _navigateService = inject(NavigateService)
}
