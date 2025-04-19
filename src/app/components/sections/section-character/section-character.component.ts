import { Component } from '@angular/core';
import { CardCharacterComponent } from "../../cards/card-character/card-character.component";
import { CardCreateComponent } from '../../cards/card-create/card-create.component';

@Component({
  selector: 'app-section-character',
  imports: [CardCharacterComponent, CardCreateComponent],
  templateUrl: './section-character.component.html',
  styleUrl: './section-character.component.scss'
})
export class SectionCharacterComponent {

}
