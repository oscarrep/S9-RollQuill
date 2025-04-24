import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-card-character',
  imports: [],
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.scss'
})
export class CardCharacterComponent {
  _navigateService = inject(NavigateService);
  @Input() character!: Character;
  @Output() buttonClick = new EventEmitter<void>();
}
