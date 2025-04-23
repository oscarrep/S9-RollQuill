import { Component, inject } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';

@Component({
  selector: 'app-card-character',
  imports: [],
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.scss'
})
export class CardCharacterComponent {
  _navigateService = inject(NavigateService);
}
