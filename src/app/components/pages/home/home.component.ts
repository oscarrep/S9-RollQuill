import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../../shared/button/button.component";
import { NavigateService } from '../../../services/navigate.service';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  _navigateService = inject(NavigateService)
}
