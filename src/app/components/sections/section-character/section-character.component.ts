import { Component, Input } from '@angular/core';
import { CardCharacterComponent } from '../../widgets/card-character/card-character.component';
import { CardCreateComponent } from '../../widgets/card-create/card-create.component';
import { ButtonComponent } from "../../../shared/button/button.component";
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-section-character',
  imports: [CardCharacterComponent, CardCreateComponent, ButtonComponent],
  templateUrl: './section-character.component.html',
  styleUrl: './section-character.component.scss'
})
export class SectionCharacterComponent {
  @Input() characters: Character[] = [];
}
