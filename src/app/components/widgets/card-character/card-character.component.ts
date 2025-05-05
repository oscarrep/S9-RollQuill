import { Component, inject, Input } from '@angular/core';
import { NavigateService } from '../../../services/navigate.service';
import { Character } from '../../../interfaces/character';
import { ButtonComponent } from "../../../shared/button/button.component";

@Component({
  selector: 'app-card-character',
  imports: [ButtonComponent],
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
  deleteChar(){console.log(this.character._id);}
}
