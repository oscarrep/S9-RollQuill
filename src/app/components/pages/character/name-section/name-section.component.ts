import { Component, input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-name-section',
  imports: [ButtonComponent],
  standalone:true,
  templateUrl: './name-section.component.html',
  styleUrl: './name-section.component.scss'
})
export class NameSectionComponent {

  charName = input<string>()
  charRace = input<string>()
  charSubRace = input<string>()
  charClass = input<string>()
  charSubClass = input<string>()
  charLevel = input<number>()
}
