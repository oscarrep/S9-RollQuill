import { Component } from '@angular/core';
import { CardCharacterComponent } from "../card-character/card-character.component";

@Component({
  selector: 'app-section-character',
  imports: [CardCharacterComponent],
  templateUrl: './section-character.component.html',
  styleUrl: './section-character.component.scss'
})
export class SectionCharacterComponent {

}
