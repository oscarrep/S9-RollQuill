import { Component, inject, Input } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-card-character',
  imports: [],
  standalone:true,
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.scss'
})
export class CardCharacterComponent {
  _navigateService = inject(NavigateService);
  @Input() character!: Character;

  showCharacter(){
    this._navigateService.navigateTo(`${this.character.createdBy}/character/${this.character._id}`);
  }
}
